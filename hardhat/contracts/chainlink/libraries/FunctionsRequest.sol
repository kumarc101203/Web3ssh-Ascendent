// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {CBOR} from "../vendor/CBOR.sol";

/// @title Library for encoding the input data of a Functions request into CBOR
library FunctionsRequest {
  using CBOR for CBOR.CBORBuffer;

  uint16 public constant REQUEST_DATA_VERSION = 1;
  uint256 internal constant DEFAULT_BUFFER_SIZE = 256;

  enum Location {
    Inline,
    Remote,
    DONHosted
  }

  enum CodeLanguage {
    JavaScript
  }

  struct Request {
    Location codeLocation;
    Location secretsLocation;
    CodeLanguage language;
    string source;
    bytes encryptedSecretsReference;
    string[] args;
    bytes[] bytesArgs;
  }

  error EmptySource();
  error EmptySecrets();
  error EmptyArgs();
  error NoInlineSecrets();

  function encodeCBOR(Request memory self) internal pure returns (bytes memory) {
    CBOR.CBORBuffer memory buffer = CBOR.create(DEFAULT_BUFFER_SIZE);

    buffer.writeString("codeLocation");
    buffer.writeUInt256(uint256(self.codeLocation));

    buffer.writeString("language");
    buffer.writeUInt256(uint256(self.language));

    buffer.writeString("source");
    buffer.writeString(self.source);

    if (self.args.length > 0) {
      buffer.writeString("args");
      buffer.startArray();
      for (uint256 i = 0; i < self.args.length; ++i) {
        buffer.writeString(self.args[i]);
      }
      buffer.endSequence();
    }

    if (self.encryptedSecretsReference.length > 0) {
      if (self.secretsLocation == Location.Inline) {
        revert NoInlineSecrets();
      }
      buffer.writeString("secretsLocation");
      buffer.writeUInt256(uint256(self.secretsLocation));
      buffer.writeString("secrets");
      buffer.writeBytes(self.encryptedSecretsReference);
    }

    if (self.bytesArgs.length > 0) {
      buffer.writeString("bytesArgs");
      buffer.startArray();
      for (uint256 i = 0; i < self.bytesArgs.length; ++i) {
        buffer.writeBytes(self.bytesArgs[i]);
      }
      buffer.endSequence();
    }

    return buffer.buf.buf;
  }

  function initializeRequest(
    Request memory self,
    Location codeLocation,
    CodeLanguage language,
    string memory source
  ) internal pure {
    if (bytes(source).length == 0) revert EmptySource();
    self.codeLocation = codeLocation;
    self.language = language;
    self.source = source;
  }

  function initializeRequestForInlineJavaScript(Request memory self, string memory javaScriptSource) internal pure {
    initializeRequest(self, Location.Inline, CodeLanguage.JavaScript, javaScriptSource);
  }

  function addSecretsReference(Request memory self, bytes memory encryptedSecretsReference) internal pure {
    if (encryptedSecretsReference.length == 0) revert EmptySecrets();
    self.secretsLocation = Location.Remote;
    self.encryptedSecretsReference = encryptedSecretsReference;
  }

  function addDONHostedSecrets(Request memory self, uint8 slotID, uint64 version) internal pure {
    CBOR.CBORBuffer memory buffer = CBOR.create(DEFAULT_BUFFER_SIZE);
    buffer.writeString("slotID");
    buffer.writeUInt64(slotID);
    buffer.writeString("version");
    buffer.writeUInt64(version);
    self.secretsLocation = Location.DONHosted;
    self.encryptedSecretsReference = buffer.buf.buf;
  }

  function setArgs(Request memory self, string[] memory args) internal pure {
    if (args.length == 0) revert EmptyArgs();
    self.args = args;
  }

  function setBytesArgs(Request memory self, bytes[] memory args) internal pure {
    if (args.length == 0) revert EmptyArgs();
    self.bytesArgs = args;
  }
}
