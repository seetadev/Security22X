// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.7.6;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

import "./interfaces/liquidityProtocol/ILiquidityProtocol.sol";
import "./LiquidityProtocolInsurance.sol";

contract InsuranceContract is Ownable {
    using SafeMath for uint256;

    uint256 public amountInsured;
    bool public paid;
    bool public supportsDonations;

    address public beneficiary;
    address private reserveTokenAddress;

    IERC20 private asset;
    ERC20 private reserveToken;
        
    ILiquidityProtocol private liquidityProtocol;
    LiquidityProtocolInsurance private liquidityProtocolInsurance;
    
    constructor(
                uint256 _amountInsured,
                address _liquidityProtocol,
                address _beneficiary, 
                address _assetAddress,
                address _liquidityProtocolInsuranceAddress,
                bool _supportsDonations) {
        amountInsured = _amountInsured;
        beneficiary = _beneficiary;
        supportsDonations = _supportsDonations;
        asset = IERC20(_assetAddress);
        liquidityProtocol = ILiquidityProtocol(_liquidityProtocol);
        liquidityProtocolInsurance = LiquidityProtocolInsurance(_liquidityProtocolInsuranceAddress);
        
        reserveTokenAddress = liquidityProtocol.getReserveTokenAddress(_assetAddress);
        reserveToken = ERC20(reserveTokenAddress);

        transferOwnership(_liquidityProtocolInsuranceAddress);
    }

    function getReserveTokenBalance() external view returns(uint256) {
        return reserveToken.balanceOf(address(this));
    }

    function getReserveTokenAddress() external view returns(address){
        return reserveTokenAddress;
    }

    function getReserveTokenDenomination() external view returns(string memory){
        return reserveToken.symbol();
    }

    function withdraw() external onlyOwner returns (uint256) {
        uint256 amountToWithdraw = 0;
        if(!paid){
            uint256 amount = reserveToken.balanceOf(address(this));
            reserveToken.transfer(address(liquidityProtocol), amount);
            liquidityProtocol.unlockTokens(address(asset), amount);
            amountToWithdraw = asset.balanceOf(address(this));
            asset.transfer(beneficiary, amountToWithdraw);
            paid = true;
        }
        return amountToWithdraw;
    }

    function withdrawToDonate(address _donationAddress) external onlyOwner {
        if(!paid && supportsDonations){
            if(reserveToken.balanceOf(address(this)) > amountInsured){
                uint256 amount = reserveToken.balanceOf(address(this)).sub(amountInsured);
                if(amount > 0){
                uint256 amountToDonate = amount.div(100);     
                reserveToken.transfer(address(liquidityProtocol), amountToDonate);
                liquidityProtocol.unlockTokens(address(asset), amountToDonate);
                asset.transfer(_donationAddress, amountToDonate);
                }
            }
        }
    }

    function isPolicyActive() external view returns(bool){
        return !paid;
    }

    function hasDonationsEnabled() external view returns(bool){
        return supportsDonations;
    }
}
