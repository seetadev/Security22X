// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.7.6;

import "./TUSDFeed.sol";

contract TUSDReserveFeed is TUSDFeed {
    
    constructor() TUSDFeed("responseData.totalTrust", 8, 1, "TUSD Reserves"){
    
    }
    
}