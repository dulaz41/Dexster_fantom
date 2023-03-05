// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract faucet is ERC20 {
    uint public amountAllowed = 1000000000000000000;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 50000000 * (10 ** 18));
    }

    mapping(address => uint) public lockTime;

    function requestTokens(address requestor, uint amount) external {
        require(
            block.timestamp > lockTime[msg.sender],
            "lock time has not expired. Please try again later"
        );

        _mint(requestor, amount);

        //updates locktime 1 day from now
        lockTime[msg.sender] = block.timestamp + 1 days;
    }
}
