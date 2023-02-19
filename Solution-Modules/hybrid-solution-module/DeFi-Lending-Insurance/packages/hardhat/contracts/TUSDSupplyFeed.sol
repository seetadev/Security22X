// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.7.6;

import "./TUSDFeed.sol";

contract TUSDSupplyFeed is TUSDFeed {
    
    constructor() TUSDFeed("responseData.totalToken", 8, 1, "TUSD Supply"){
    
    }
}