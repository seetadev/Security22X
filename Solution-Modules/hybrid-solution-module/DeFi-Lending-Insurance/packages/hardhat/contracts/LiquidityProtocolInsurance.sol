// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.7.6;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@chainlink/contracts/src/v0.7/interfaces/AggregatorV3Interface.sol";

import "./interfaces/liquidityProtocol/ILiquidityProtocol.sol";
import "./InsuranceContract.sol";
import "./KeeperCompatibleInterface.sol";

contract LiquidityProtocolInsurance is Ownable, KeeperCompatibleInterface{

    //Library for safe math operations (overflow, underflow)
    using SafeMath for uint256;

    //Stores the asset pair: Liquidity Protocol Address + The latest reserve we queried
    struct LiquidityAssetPair{
        address liquidityProtocol;
        uint256 latestReserve;
    }

    //Event when an insurance policy is created
    event InsurancePolicyCreation (
        address indexed beneficiary,
        address indexed insuranceContractAddress
    );
    
    //Event when we pay back the beneficiary
    event Payout (
        address indexed beneficiary,
        address indexed insuranceContractAddress,
        uint256 amountPaid
    );

    //TUSD Proof-of-reserve Feed
    AggregatorV3Interface internal tusdReserveFeed;
    //TUSD Proof-of-Supply Feed
    AggregatorV3Interface internal tusdSupplyFeed;

    //TUSD Token Address
    //TODO: Make this dynamic
    address public tusdTokenAddress; 

    //Donation address
    address public donationAddress;
    uint256 constant public MAXIMUM_RESERVE_DECREASE_PERCENTAGE = 75;

    address[] public liquidityProtocolImplementations;
    address[] public insuranceContracts;
    address[] public insuranceContractsWithDonations;
    LiquidityAssetPair[] public liquidityAssetPairs;
    
    mapping(address => address[]) public insuranceContractOwnerships;
    mapping(uint => address[]) public liquidityAssetPairToInsuranceContracts;

    constructor(address[] memory _liquidityProtocolImplementations, 
                address _tusdTokenAddress,
                address _tusdSupplyFeedAddress, 
                address _tusdReserveFeedAddress,
                address _donationAddress) {
        liquidityProtocolImplementations = _liquidityProtocolImplementations;
        tusdTokenAddress = _tusdTokenAddress;
        donationAddress = _donationAddress;
        tusdReserveFeed = AggregatorV3Interface(_tusdReserveFeedAddress);
        tusdSupplyFeed = AggregatorV3Interface(_tusdSupplyFeedAddress);
        
    }

    /*----------  MODIFIERS  ----------*/

    modifier validateLiquidityProtocolAddress(address _liquidityProtocolAddress) {
        bool found = false;
        for(uint i = 0; i < liquidityProtocolImplementations.length; i++){
            if(_liquidityProtocolAddress == liquidityProtocolImplementations[i]){
                found = true;
            }
        }
        require(found, "Liquidity Protocol address not found in the whitelist");
        _;
    }

    /*----------  PUBLIC FUNCTIONS  ----------*/

    function registerInsurancePolicy(
        uint256 _amountInsured,
        address _liquidityProtocol,
        bool _supportsDonations) 
    public validateLiquidityProtocolAddress(_liquidityProtocol) {
        //Create insurance contract
        InsuranceContract insuranceContract = new InsuranceContract(
                _amountInsured,
                _liquidityProtocol,
                msg.sender, 
                tusdTokenAddress,
                address(this), 
                _supportsDonations);
        
        ILiquidityProtocol liquidityProtocol = ILiquidityProtocol(_liquidityProtocol);

        //Send tokens to liquidity protocol interface contract
        IERC20(tusdTokenAddress).transferFrom(msg.sender, _liquidityProtocol, _amountInsured);
        
        //Put tokens in liquidity pool
        liquidityProtocol.lockTokens(tusdTokenAddress, _amountInsured);
        
        //Update latest reserve value
        uint256 reserve = liquidityProtocol.getReserve(tusdTokenAddress);
    
        LiquidityAssetPair memory pair = LiquidityAssetPair({ liquidityProtocol: _liquidityProtocol, latestReserve: reserve});
        uint liquidityAssetPairIdentifier = registerLiquidityAssetPair(pair);

        //Send liquidity tokens to the Insurance Contract - 10% which will remain in this contract
        uint256 amountToKeep = _amountInsured.mul(5).div(100);        
        IERC20(liquidityProtocol.getReserveTokenAddress(tusdTokenAddress)).transfer(address(insuranceContract), _amountInsured - amountToKeep);
        
        
        //Register address of Insurance Contract on chain
        address insuranceContractAddress = address(insuranceContract);

        insuranceContracts.push(insuranceContractAddress);
        insuranceContractOwnerships[msg.sender].push(insuranceContractAddress);
        liquidityAssetPairToInsuranceContracts[liquidityAssetPairIdentifier].push(insuranceContractAddress);
        if(_supportsDonations){
            insuranceContractsWithDonations.push(insuranceContractAddress);
        }
        emit InsurancePolicyCreation(msg.sender, insuranceContractAddress);
    }


    function withdraw(address _insuranceContractAddress) external {
        InsuranceContract insuranceContract = InsuranceContract(_insuranceContractAddress);
        require(msg.sender == insuranceContract.beneficiary(), "only a beneficiary can trigger a withdrawal");
        insuranceContract.withdraw();
    }

    function getInsurancePolicyAddresses() public view returns(address[] memory) {
        return insuranceContractOwnerships[msg.sender];
    }

    function getTUSDSupplyFeed() external view returns(address) {
        return address(tusdSupplyFeed);
    }

    function getTUSDReserveFeed() external view returns(address) {
        return address(tusdReserveFeed);
    }

    function checkStatusForUnstableTUSDPeg() public view returns (bool) {
        bool shouldMakeTransaction = false;
        int supply; 
        int reserve;
        int percentage = 0;
        ( , supply, , , ) = tusdSupplyFeed.latestRoundData();
        ( , reserve, , , ) = tusdReserveFeed.latestRoundData();
        if(reserve < supply) { 
            int difference = supply  - reserve;
            percentage = (difference * 100) / supply;
            if(percentage > 5){
                shouldMakeTransaction = true;
            }
        }
        return shouldMakeTransaction;
    }

    function checkForSignificantReserveDecrease() public onlyOwner returns(bool)  {
        for(uint liquidityAssetPairsIdx = 0; liquidityAssetPairsIdx < liquidityAssetPairs.length; liquidityAssetPairsIdx++){
            LiquidityAssetPair storage pair = liquidityAssetPairs[liquidityAssetPairsIdx];
            uint256 decreasePercentage = calculateReserveDecreasePercentage(pair);
            if(decreasePercentage >= MAXIMUM_RESERVE_DECREASE_PERCENTAGE){
                return true;
            }
        }
        return false;
    }

    /*----------  ADMINISTRATOR ONLY FUNCTIONS  ----------*/
    
    function setTUSDSupplyFeed(address _tusdSupplyFeedAddress) external onlyOwner {
        tusdSupplyFeed = AggregatorV3Interface(_tusdSupplyFeedAddress);
    }

    function setTUSDReserveFeed(address _tusdReserveFeedAddress) external onlyOwner {
        tusdReserveFeed = AggregatorV3Interface(_tusdReserveFeedAddress);
    }

    function setDonationAddress(address _donationAddress) external onlyOwner {
        donationAddress = _donationAddress;
    }

    /*----------  ADMINISTRATOR ONLY FUNCTIONS (TASKS)  ----------*/  
    function checkForSignificantReserveDecreaseAndPay() public onlyOwner {
        for(uint liquidityAssetPairsIdx = 0; liquidityAssetPairsIdx < liquidityAssetPairs.length; liquidityAssetPairsIdx++){
            LiquidityAssetPair storage pair = liquidityAssetPairs[liquidityAssetPairsIdx];
            uint256 decreasePercentage = calculateReserveDecreasePercentage(pair);
            if(decreasePercentage >= MAXIMUM_RESERVE_DECREASE_PERCENTAGE){
                ILiquidityProtocol liquidityProtocol = ILiquidityProtocol(pair.liquidityProtocol);
                address reserveTokenAddress  = liquidityProtocol.getReserveTokenAddress(tusdTokenAddress);
                IERC20 reserveToken = IERC20(reserveTokenAddress);
                reserveToken.transfer(pair.liquidityProtocol, reserveToken.balanceOf(address(this)));
                liquidityProtocol.unlockTokens(tusdTokenAddress, reserveToken.balanceOf(address(this)));
                for(uint256 insuranceContractsIdx = 0; insuranceContractsIdx < liquidityAssetPairToInsuranceContracts[liquidityAssetPairsIdx].length; insuranceContractsIdx++){
                    address insuranceContractAddress = liquidityAssetPairToInsuranceContracts[liquidityAssetPairsIdx][insuranceContractsIdx];
                    payInsuranceContract(insuranceContractAddress);
                }
            }
        }
    }

    function checkForUnstableTUSDPegAndPay() public onlyOwner {
        int supply; 
        int reserve;
        int percentage = 0;
        ( , supply, , , ) = tusdSupplyFeed.latestRoundData();
        ( , reserve, , , ) = tusdReserveFeed.latestRoundData();
        if(reserve < supply) { 
            int difference = supply  - reserve;
            percentage = (difference * 100) / supply;
            if(percentage > 5){
                //TODO: Ideally we should transform here the TUSD to other coin
                payAllInsuranceContracts();
            }
        }
    }

    function distributeDonations() external onlyOwner {
        for(uint i = 0 ; i < insuranceContractsWithDonations.length; i++){
            InsuranceContract insuranceContract = InsuranceContract(insuranceContractsWithDonations[i]);
            insuranceContract.withdrawToDonate(donationAddress);
        }
    }


    /*----------  PRIVATE FUNCTIONS  ----------*/
    function payAllInsuranceContracts() private {
        for(uint256 i = 0; i < insuranceContracts.length; i++){     
            payInsuranceContract(insuranceContracts[i]);
        }
    }
    
    function payInsuranceContract(address _insuranceContractAddress) private {
        InsuranceContract insuranceContract = InsuranceContract(_insuranceContractAddress);
        if(insuranceContract.isPolicyActive()){
            //Pay the beneficiary
            uint256 withdrawnAmount = insuranceContract.withdraw();
            if(withdrawnAmount < insuranceContract.amountInsured()){
                // The amount we are going to send to the beneficiary is lower than the amount insured! 
                // We will take funds from the insurance to cover losses.
                uint256 diff = insuranceContract.amountInsured() - withdrawnAmount;
                IERC20(tusdTokenAddress).transfer(insuranceContract.beneficiary(), diff);
                withdrawnAmount = diff;
            }
            if(withdrawnAmount > 0){
                emit Payout(insuranceContract.beneficiary(), _insuranceContractAddress, withdrawnAmount);
            }
        }
    }

    function calculateReserveDecreasePercentage(LiquidityAssetPair storage _liquidityAssetPair) private returns(uint256) {
        uint256 percentage = 0;
        ILiquidityProtocol liquidityProtocol = ILiquidityProtocol(_liquidityAssetPair.liquidityProtocol);
        uint256 currentReserve = liquidityProtocol.getReserve(tusdTokenAddress);
        uint256 previousReserve = _liquidityAssetPair.latestReserve;
        if(currentReserve < previousReserve){
            uint256 difference = previousReserve.sub(currentReserve);
            percentage = difference.mul(100).div(previousReserve);
        }
        _liquidityAssetPair.latestReserve = currentReserve;
        return percentage;
    }

    function registerLiquidityAssetPair(LiquidityAssetPair memory _liquidityAssetPair) private returns (uint256) {
        for(uint i = 0; i < liquidityAssetPairs.length; i++) {
            if(equals(_liquidityAssetPair, liquidityAssetPairs[i])){
                return i;
            }
        }
        liquidityAssetPairs.push(_liquidityAssetPair);       
        uint256 liquidityAssetPairIdentifier = liquidityAssetPairs.length - 1;
        return liquidityAssetPairIdentifier;
    }  

    function equals(LiquidityAssetPair memory _first, LiquidityAssetPair memory _second) private pure returns (bool) {
        return _first.liquidityProtocol == _second.liquidityProtocol;
    }

    /*----------  CHAINLINK KEEPERS  ----------*/

    function checkUpkeep(bytes calldata checkData) external override returns (bool upkeepNeeded, bytes memory performData) {
        bool tusdCheck = checkStatusForUnstableTUSDPeg();
        bool lendingProtocolReserveCheck = checkForSignificantReserveDecrease();
        bool shouldDoUpkeep = tusdCheck || lendingProtocolReserveCheck;
        bytes memory execution = "";
        if(tusdCheck) {
            execution = "t";
        } 
        else if(lendingProtocolReserveCheck) {
            execution = "l";
        } 
        return (shouldDoUpkeep, execution);
    }

    function performUpkeep(bytes calldata performData) external override {
        bytes32 performDataString = keccak256(performData);
        if (performDataString == keccak256("t")) {
            checkForUnstableTUSDPegAndPay();
        }
        else if (performDataString == keccak256("l")) {
            checkForSignificantReserveDecreaseAndPay();
        }
    }

}