import { contractABI } from './abi.js';

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // e.g., 0x5FbDB2315678afecb367f032d93F642f64180aa3

let signer;
let contract;

async function connectWallet() {
if (!window.ethereum) {
alert("Install MetaMask!");
return;
}

const provider = new ethers.BrowserProvider(window.ethereum);
await provider.send("eth_requestAccounts", []);
signer = await provider.getSigner();
contract = new ethers.Contract(contractAddress, contractABI, signer);

const account = await signer.getAddress();
document.getElementById("walletAddress").innerText = `Connected: ${account}`;
}

async function fundContract() {
try {
const tx = await contract.fundContract({ value: ethers.parseEther("1.0") });
await tx.wait();
setStatus("Contract funded with 1 ETH.");
} catch (err) {
handleError(err);
}
}

async function markWorkDone() {
const amountInput = document.getElementById("workAmount").value;
if (!amountInput) return alert("Enter a valid amount");

try {
const tx = await contract.markWorkDone(amountInput); // Wei
await tx.wait();
setStatus(`Marked work done for ${amountInput} Wei.`);
} catch (err) {
  handleError(err);
}
}

async function releasePayment() {
try {
const tx = await contract.releasePayment();
await tx.wait();
setStatus("Payment released to freelancer.");
} catch (err) {
handleError(err);
}
}

async function cancelProject() {
try {
const tx = await contract.cancelProject();
await tx.wait();
setStatus("Project cancelled. Freelancer compensated.");
} catch (err) {
handleError(err);
}
}

function setStatus(msg) {
document.getElementById("status").innerText = msg;
}

function handleError(err) {
console.error(err);
setStatus("Error: " + (err.reason || err.message || "Unknown"));
}

document.getElementById("connectButton").onclick = connectWallet;
document.getElementById("fundButton").onclick = fundContract;
document.getElementById("markWorkDoneButton").onclick = markWorkDone;
document.getElementById("releasePaymentButton").onclick = releasePayment;
document.getElementById("cancelProjectButton").onclick = cancelProject;