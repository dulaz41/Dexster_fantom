// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Faucet {
    uint256 transactionCount;

    event Transfer(
        address from,
        address receiver,
        uint amount,
        string message,
        uint256 timestamp
    );

    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
    }

    TransferStruct[] transactions;

    uint public numOfFunders;

    mapping(address => bool) private funders;
    mapping(uint => address) private lutFunders;

    modifier limitWithdraw(uint withdrawAmount) {
        require(
            withdrawAmount <= 100000000000000000,
            "Cannot withdraw more than 0.1 ether"
        );
        _;
    }

    receive() external payable {}

    function addFunds() external payable {
        address funder = msg.sender;

        if (!funders[funder]) {
            uint index = numOfFunders++;
            funders[funder] = true;
            lutFunders[index] = funder;
        }
    }

    function addToBlockchain(
        address payable receiver,
        uint amount,
        string memory message
    ) public {
        transactionCount += 1;
        transactions.push(
            TransferStruct(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp
            )
        );

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp);
    }

    function withdraw(
        uint withdrawAmount
    ) external limitWithdraw(withdrawAmount) {
        payable(msg.sender).transfer(withdrawAmount);
    }

    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }

    function getAllFunders() external view returns (address[] memory) {
        address[] memory _funders = new address[](numOfFunders);

        for (uint i = 0; i < numOfFunders; i++) {
            _funders[i] = lutFunders[i];
        }

        return _funders;
    }

    function getFunderAtIndex(uint8 index) external view returns (address) {
        return lutFunders[index];
    }
}
