// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {FunctionsClient} from "./chainlink/FunctionsClient.sol";
import {FunctionsRequest} from "./chainlink/libraries/FunctionsRequest.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract FreelanceEscrow is FunctionsClient, ReentrancyGuard {
    using FunctionsRequest for FunctionsRequest.Request;

    address payable public client;
    address payable public freelancer;
    uint256 public totalAmount;
    
    bytes32 public latestRequestId;
    uint256 public latestAiScore;

    // Chainlink required
    bytes32 public donId;
    uint64 public subscriptionId;
    
    // Contract states as per Task 1.1
    enum Status { Created, WorkSubmitted, AwaitingOracle, Resolved }
    Status public status;

    // Custom Errors
    error UnexpectedRequestID(bytes32 requestId);
    error InvalidScore(uint256 score);

    // Events as per Task 1.2
    event EvaluationRequested(bytes32 indexed requestId, uint256 timestamp);
    event EvaluationReceived(bytes32 indexed requestId, uint256 score, uint256 timestamp);
    event FundsDistributed(bytes32 indexed requestId, uint256 score, uint256 freelancerShare, uint256 clientRefund, uint256 timestamp);

    constructor(
        address _router,
        bytes32 _donId,
        uint64 _subscriptionId,
        address payable _freelancer
    ) FunctionsClient(_router) payable {
        client = payable(msg.sender);
        freelancer = _freelancer;
        totalAmount = msg.value;
        donId = _donId;
        subscriptionId = _subscriptionId;
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

    // Task 1.1: Submit Work
    function submitWork() external onlyFreelancer nonReentrant {
        require(status == Status.Created, "Invalid status");
        status = Status.WorkSubmitted;
    }

    // Task 1.1: Trigger AI Evaluation Oracle
    function requestEvaluation(
        string calldata source,
        string[] calldata args
    ) external nonReentrant returns (bytes32 requestId) {
        require(msg.sender == client || msg.sender == freelancer, "Not authorized");
        require(status == Status.WorkSubmitted, "Work not submitted yet");
        
        status = Status.AwaitingOracle;

        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source);
        if (args.length > 0) req.setArgs(args);

        latestRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            300000,
            donId
        );
        
        emit EvaluationRequested(latestRequestId, block.timestamp);
        return latestRequestId;
    }

    // Task 1.2: Implement Autonomous Payout Logic
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override nonReentrant {
        if (latestRequestId != requestId) {
            revert UnexpectedRequestID(requestId);
        }
        require(status == Status.AwaitingOracle, "Not awaiting oracle");

        // For simplicity: If there's a hard error, we kick back to WorkSubmitted so they can try again.
        if (err.length > 0) {
           status = Status.WorkSubmitted;
           return;
        }

        // Decode the integer back up (Task 8.1 decoding format)
        uint256 score = abi.decode(response, (uint256));
        if (score > 100) revert InvalidScore(score); // Security Hardening

        latestAiScore = score;
        status = Status.Resolved;
        
        emit EvaluationReceived(requestId, score, block.timestamp);

        uint256 freelancerShare = 0;
        uint256 clientRefund = 0;

        if (score < 50) {
            clientRefund = totalAmount;
        } else if (score >= 90) {
            freelancerShare = totalAmount;
        } else {
            freelancerShare = (totalAmount * score) / 100;
            clientRefund = totalAmount - freelancerShare; // Ensures no dust remains
        }

        // Send funds safely
        if (freelancerShare > 0) {
            (bool s1, ) = freelancer.call{value: freelancerShare}("");
            require(s1, "Transfer to freelancer failed");
        }
        if (clientRefund > 0) {
            (bool s2, ) = client.call{value: clientRefund}("");
            require(s2, "Transfer to client failed");
        }
        
        emit FundsDistributed(requestId, score, freelancerShare, clientRefund, block.timestamp);
    }
}
