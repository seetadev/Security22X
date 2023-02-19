// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.7.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TUSDMock is ERC20{

    constructor() ERC20("TUSD Mock", "MTUSD"){
        _mint(msg.sender, 2000 ether);
    }

    function faucet(address to, uint256 amount) external {
        _mint(to, amount);
    }

    function burn(address account, uint256 amount) external {
        _burn(account, amount);
    }

    function decimals() override public view returns (uint8) {
        return 18;
    }

}