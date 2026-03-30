// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title Chainlink Functions client interface.
interface IFunctionsClient {
  function handleOracleFulfillment(bytes32 requestId, bytes memory response, bytes memory err) external;
}
