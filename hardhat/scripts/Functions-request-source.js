// Functions-request-source.js
// This JavaScript runs on Chainlink Decentralized Oracle Network (DON) nodes.
// It fetches the AI score from your backend and returns it to the smart contract.

// args[0] = contract_id (passed from the smart contract)
// args[1] = backend base URL (passed from the smart contract)

const contractId = args[0];
const backendUrl = args[1] || "https://web3ssh-backend.onrender.com";

// Build the full URL for the oracle endpoint
const url = `${backendUrl}/api/oracle/score/${contractId}`;

// Make the HTTP GET request from the Chainlink DON
const response = await Functions.makeHttpRequest({
  url: url,
  method: "GET",
  timeout: 10000, // 10 second timeout
});

// Handle HTTP errors
if (response.error) {
  throw new Error(`HTTP request failed: ${response.error}`);
}

// Parse the response
const data = response.data;

// Validate the response has a score field
if (data.score === undefined || data.score === null) {
  throw new Error("Missing 'score' field in API response");
}

// Validate the score is an integer between 0 and 100
const score = Math.round(Number(data.score));

if (isNaN(score)) {
  throw new Error(`Invalid score value: ${data.score}`);
}

if (score < 0 || score > 100) {
  throw new Error(`Score out of range (0-100): ${score}`);
}

// Encode the score as a uint256 and return to the smart contract
// Functions.encodeUint256 returns bytes that Solidity can decode with abi.decode(response, (uint256))
return Functions.encodeUint256(score);
