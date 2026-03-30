// deploy.js — Deploys FreelanceEscrow to the specified network
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  // --- Configuration ---
  // For Sepolia Chainlink Functions
  const routerAddress = process.env.CHAINLINK_ROUTER_ADDRESS || "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0";
  const donIdString = process.env.CHAINLINK_DON_ID || "fun-ethereum-sepolia-1";
  const donId = hre.ethers.encodeBytes32String(donIdString);
  const subscriptionId = parseInt(process.env.CHAINLINK_SUBSCRIPTION_ID || "0");

  // The freelancer address (for demo, use the second signer or provide via env)
  const freelancerAddress = process.env.FREELANCER_ADDRESS || deployer.address;

  // Escrow amount (in ETH)
  const escrowAmountEth = process.env.ESCROW_AMOUNT || "0.01";
  const escrowAmount = hre.ethers.parseEther(escrowAmountEth);

  console.log("\n--- Deployment Parameters ---");
  console.log("Router:", routerAddress);
  console.log("DON ID:", donIdString);
  console.log("Subscription ID:", subscriptionId);
  console.log("Freelancer:", freelancerAddress);
  console.log("Escrow Amount:", escrowAmountEth, "ETH");

  // Deploy
  const FreelanceEscrow = await hre.ethers.getContractFactory("FreelanceEscrow");
  const escrow = await FreelanceEscrow.deploy(
    routerAddress,
    donId,
    subscriptionId,
    freelancerAddress,
    { value: escrowAmount }
  );

  await escrow.waitForDeployment();
  const address = await escrow.getAddress();

  console.log("\n✅ FreelanceEscrow deployed to:", address);
  console.log("\n--- Next Steps ---");
  console.log("1. Add this contract as a consumer to your Chainlink subscription at https://functions.chain.link");
  console.log("2. Update your frontend config with the contract address:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });