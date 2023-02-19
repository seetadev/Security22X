// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.7.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//Test Reserve Token Mock contract used for unit tests. DO NOT deploy this!
contract ReserveTokenMock is ERC20, Ownable {
    constructor() ERC20("PDARM Test Token", "TPDARM"){
    }

    function faucet(address to, uint256 amount) external {
        _mint(to, amount);
    }

    function burn(address account, uint256 amount) external {
        _burn(account, amount);
    }

}