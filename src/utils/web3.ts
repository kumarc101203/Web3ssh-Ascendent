// src/utils/web3.ts
import { ethers } from "ethers";

// Allows typescript to know about window.ethereum standard
declare global {
  interface Window {
    ethereum?: any;
  }
}

/**
 * Prompts MetaMask to connect and returns the signer context.
 */
export const connectWallet = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask not found! Please install the browser extension.");
  }
  
  await window.ethereum.request({ method: "eth_requestAccounts" });
  
  // Connect to MetaMask using ethers.js v6 syntax
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  
  return { provider, signer, address };
};

/**
 * Returns a fully authenticated Contract instance ready to execute write transactions.
 */
export const getActiveContract = async (contractAddress: string, abi: any) => {
  const { signer } = await connectWallet();
  return new ethers.Contract(contractAddress, abi, signer);
};
