// src/utils/contract.ts
import EscrowArtifact from '../../hardhat/artifacts/contracts/FreelanceEscrow.sol/FreelanceEscrow.json';

// Ensure your ABI is structurally loaded by Vite directly from Hardhat's output
export const ESCROW_ABI = EscrowArtifact.abi;

// The live contract address we deployed to Sepolia
export const ESCROW_CONTRACT_ADDRESS = "0xA67792A536fDc310B7ec9b151E633AF70D680628";
