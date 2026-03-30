// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title Library of types that are used for fulfillment of a Functions request
library FunctionsResponse {
  struct RequestMeta {
    bytes data;
    bytes32 flags;
    address requestingContract;
    uint96 availableBalance;
    uint72 adminFee;
    uint64 subscriptionId;
    uint64 initiatedRequests;
    uint32 callbackGasLimit;
    uint16 dataVersion;
    uint64 completedRequests;
    address subscriptionOwner;
  }

  enum FulfillResult {
    FULFILLED,
    USER_CALLBACK_ERROR,
    INVALID_REQUEST_ID,
    COST_EXCEEDS_COMMITMENT,
    INSUFFICIENT_GAS_PROVIDED,
    SUBSCRIPTION_BALANCE_INVARIANT_VIOLATION,
    INVALID_COMMITMENT
  }

  struct Commitment {
    bytes32 requestId;
    address coordinator;
    uint96 estimatedTotalCostJuels;
    address client;
    uint64 subscriptionId;
    uint32 callbackGasLimit;
    uint72 adminFee;
    uint72 donFee;
    uint40 gasOverheadBeforeCallback;
    uint40 gasOverheadAfterCallback;
    uint32 timeoutTimestamp;
  }
}
