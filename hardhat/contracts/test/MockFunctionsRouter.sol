// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../chainlink/libraries/FunctionsResponse.sol";

/// @title MockFunctionsRouter — Simulates Chainlink Functions Router for local testing
/// @dev Allows tests to manually trigger fulfillment callbacks
contract MockFunctionsRouter {
    struct PendingRequest {
        address client;
        bool exists;
    }

    mapping(bytes32 => PendingRequest) public pendingRequests;
    uint256 private _requestCounter;

    /// @notice Simulates sendRequest — generates a fake requestId
    function sendRequest(
        uint64 /* subscriptionId */,
        bytes calldata /* data */,
        uint16 /* dataVersion */,
        uint32 /* callbackGasLimit */,
        bytes32 /* donId */
    ) external returns (bytes32) {
        _requestCounter++;
        bytes32 requestId = keccak256(abi.encodePacked(_requestCounter, msg.sender, block.timestamp));
        pendingRequests[requestId] = PendingRequest({client: msg.sender, exists: true});
        return requestId;
    }

    /// @notice Manually fulfill a request — called by the test to simulate the oracle callback
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) external {
        PendingRequest memory req = pendingRequests[requestId];
        require(req.exists, "Request does not exist");
        delete pendingRequests[requestId];

        // Call handleOracleFulfillment on the consumer contract
        (bool success, bytes memory returnData) = req.client.call(
            abi.encodeWithSignature(
                "handleOracleFulfillment(bytes32,bytes,bytes)",
                requestId,
                response,
                err
            )
        );
        if (!success) {
            // Propagate the exact revert data from the callback
            assembly {
                revert(add(returnData, 32), mload(returnData))
            }
        }
    }
}
