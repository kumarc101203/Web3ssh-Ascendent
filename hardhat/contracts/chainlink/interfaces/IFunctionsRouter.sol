// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {FunctionsResponse} from "../libraries/FunctionsResponse.sol";

/// @title Chainlink Functions Router interface.
interface IFunctionsRouter {
  function getAllowListId() external view returns (bytes32);
  function setAllowListId(bytes32 allowListId) external;
  function getAdminFee() external view returns (uint72 adminFee);

  function sendRequest(
    uint64 subscriptionId,
    bytes calldata data,
    uint16 dataVersion,
    uint32 callbackGasLimit,
    bytes32 donId
  ) external returns (bytes32);

  function sendRequestToProposed(
    uint64 subscriptionId,
    bytes calldata data,
    uint16 dataVersion,
    uint32 callbackGasLimit,
    bytes32 donId
  ) external returns (bytes32);

  function fulfill(
    bytes memory response,
    bytes memory err,
    uint96 juelsPerGas,
    uint96 costWithoutFulfillment,
    address transmitter,
    FunctionsResponse.Commitment memory commitment
  ) external returns (FunctionsResponse.FulfillResult, uint96);

  function isValidCallbackGasLimit(uint64 subscriptionId, uint32 callbackGasLimit) external view;
  function getContractById(bytes32 id) external view returns (address);
  function getProposedContractById(bytes32 id) external view returns (address);
  function getProposedContractSet() external view returns (bytes32[] memory, address[] memory);
  function proposeContractsUpdate(bytes32[] memory proposalSetIds, address[] memory proposalSetAddresses) external;
  function updateContracts() external;
  function pause() external;
  function unpause() external;
}
