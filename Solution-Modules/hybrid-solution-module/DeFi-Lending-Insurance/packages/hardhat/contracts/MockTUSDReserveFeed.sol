// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.7.6;

import "@chainlink/contracts/src/v0.7/tests/MockV3Aggregator.sol";

contract MockTUSDReserveFeed is MockV3Aggregator {
    constructor(uint8 _decimals, int256 _initialAnswer) 
    MockV3Aggregator(_decimals, _initialAnswer){

    }
}