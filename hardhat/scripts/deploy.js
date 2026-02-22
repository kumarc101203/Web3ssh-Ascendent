const hre = require("hardhat");

async function main() {
const [client, freelancer] = await hre.ethers.getSigners();

const FreelanceEscrow = await hre.ethers.getContractFactory("FreelanceEscrow");

// Deploy the contract
const contract = await FreelanceEscrow.deploy(freelancer.address);
await contract.waitForDeployment(); // ✅ CORRECT in ethers v6

console.log("Contract deployed to:", await contract.getAddress());
}

main().catch((error) => {
console.error(error);
process.exitCode = 1;
});