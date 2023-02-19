// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.7.6;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./interfaces/liquidityProtocol/ILiquidityProtocol.sol";
import "./interfaces/aave/IProtocolDataProvider.sol";
import "./interfaces/aave/ILendingPool.sol";

contract AaveLiquidityProtocol is ILiquidityProtocol {
    
    IProtocolDataProvider public protocolDataProvider;
    ILendingPool public lendingPool;
    
    constructor(address _protocolDataProviderAddress, address _lendingPoolAddress) {
        protocolDataProvider = IProtocolDataProvider(_protocolDataProviderAddress);
        lendingPool = ILendingPool(_lendingPoolAddress);
    }
    
    //Gets the protocol's reserves for parameter 1
    function getReserve(address asset) override external view returns (uint256){
        uint tokenLiquidity;
        uint totalStableDebt;
        uint totalVariableDebt;
        (tokenLiquidity, totalStableDebt, totalVariableDebt, , , , , , , ) = protocolDataProvider.getReserveData(asset);
        return tokenLiquidity + totalStableDebt + totalVariableDebt;
    }

    //Stakes or lends an amount of tokens to the liquidity protocol
    function lockTokens(address asset, uint256 amount) override external{
        IERC20(asset).approve(address(lendingPool), amount);
        lendingPool.deposit(asset, amount, msg.sender, 0);
    }
    
    function getReserveTokenAddress(address asset) override external view returns (address){
        address reserveTokenAddress;
        (reserveTokenAddress, , ) = protocolDataProvider.getReserveTokensAddresses(asset);
        return reserveTokenAddress;
    }

    function unlockTokens(address asset, uint256 amount) override external{
        address reserveTokenAddress;
        (reserveTokenAddress, , ) = protocolDataProvider.getReserveTokensAddresses(asset);
        IERC20(reserveTokenAddress).approve(address(lendingPool), amount);
        lendingPool.withdraw(asset, amount, msg.sender);
    }


}