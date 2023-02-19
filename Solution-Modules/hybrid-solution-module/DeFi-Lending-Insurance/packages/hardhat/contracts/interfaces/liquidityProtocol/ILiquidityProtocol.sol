// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.7.6;

interface ILiquidityProtocol {
    
    //Gets the protocol's reserves for parameter 1
    function getReserve(address asset) external view returns (uint256);

    //Stakes or lends an amount of tokens to the liquidity protocol
    function lockTokens(address asset, uint256 amount) external;
    
    //Returns the address of reserve token (aToken, cToken, yToken, etc.)
    function getReserveTokenAddress(address asset) external view returns (address);
    
    //Withdraws the tokens from the liquidity protocol
    function unlockTokens(address asset, uint256 amount) external;
}