// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract FreelanceEscrow {
    address public client;
    address public freelancer;
    uint public totalAmount;
    uint public workCompletedAmount;
    bool public isCancelled;

    enum Status { Created, Funded, InProgress, Completed, Cancelled }
    Status public status;

    constructor(address _freelancer) payable {
        client = msg.sender;
        freelancer = _freelancer;
        status = Status.Created;
    }

    modifier onlyClient() {
        require(msg.sender == client, "Only client allowed");
        _;
    }

    modifier onlyFreelancer() {
        require(msg.sender == freelancer, "Only freelancer allowed");
        _;
    }

    function fundContract() public payable onlyClient {
        require(status == Status.Created, "Invalid status");
        totalAmount = msg.value;
        status = Status.Funded;
    }

    function markWorkDone(uint _amount) public onlyClient {
        require(status == Status.Funded || status == Status.InProgress, "Invalid status");
        require(_amount <= totalAmount, "Cannot exceed total");
        workCompletedAmount = _amount;
        status = Status.InProgress;
    }

    function releasePayment() public onlyClient {
        require(status == Status.InProgress, "Work not marked in progress");
        payable(freelancer).transfer(workCompletedAmount);
        totalAmount -= workCompletedAmount;
        status = Status.Completed;
    }

    function cancelProject() public onlyClient {
        require(status == Status.Funded || status == Status.InProgress, "Cannot cancel now");
        isCancelled = true;
        uint compensation = (totalAmount * 25) / 100;
        uint totalPayout = compensation + workCompletedAmount;
        require(totalPayout <= totalAmount, "Insufficient funds for payout");
        payable(freelancer).transfer(totalPayout);
        totalAmount -= totalPayout;
        status = Status.Cancelled;
    }

    function withdrawRemaining() public onlyClient {
        require(status == Status.Cancelled || status == Status.Completed, "Not yet finished");
        payable(client).transfer(address(this).balance);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
