# 📄 PROJECT_REQUIREMENTS: Web3SSH-Ascendant (Frozen v1.0)

## 🏗️ Core Architecture
**Platform**: Decentralized AI Escrow & Auditor  
**Identity Layer**: Web3-Locked (MetaMask Mandatory)  
**Verification Layer**: Gemini AI Deep-Discovery Scouter  
**Settlement Layer**: Chainlink Functions (Sepolia Testnet)  

---

## 🎨 Frontend (Vite + React + TypeScript)
1. **Glassmorphic UI**: High-fidelity translucent headers and cards with backdrop-blur effects.
2. **Global WalletGuard**:
   - Centralized route protection for `/services`, `/disputes`, and `/freelancer/:id`.
   - Live asynchronous verification of `window.ethereum` accounts.
   - Forced MetaMask account selector on every connection attempt.
3. **Responsive Grid**: 3-column service display with mobile-first responsiveness.
4. **Real-time Connectivity**: Visual indicators for Backend and Blockchain (Sepolia) status.
5. **Manual Security**: Dedicated "Disconnect" controls to revoke session identity.

---

## 🐍 Backend (FastAPI + Gemini AI)
1. **GitHub Deep-Discovery Scouter**:
   - Automated repository file tree scanning via GitHub API.
   - Search-based content fetching (targeted search for Keywords: *Achievement, Award, Cert, Milestone*).
   - Dynamic default-branch detection (main/master/custom).
2. **Evaluation Logic**:
   - Gemini 1.5 Flash (Primary) / 2.0 Flash (Advanced) with automatic fallback.
   - Evidence-based auditing (AI must reference specific file paths and code snippets).
   - Diagnostic Mode: Detailed error reporting for Quota (429) or Connection (404) issues.
3. **Data Resilience**:
   - Expanded 500-file structure visibility for deep-nested auditing.
   - 4000-character context window per source file.

---

## ⛓️ Smart Contracts & Oracle
1. **Escrow Contract**:
   - Solidity-based fund locking and release.
   - Integration with Chainlink Functions for off-chain result ingestion.
2. **Oracle Integration**:
   - Automated settlement trigger based on AI analysis verdict.
   - Sepolia Testnet deployment with verified Etherscan contracts.

---

## 🛠️ Technical Stack (Frozen)
- **Frontend**: React 18, Vite, Tailwind CSS, GSAP, ethers.js v6.
- **Backend**: FastAPI, Python 3.10+, google-generativeai 0.3.2, requests.
- **Oracle**: Chainlink Functions v1.0.
- **DevOps**: GitHub Actions (Potential), Render.yaml (Deployment).

---

## ✅ Acceptance Criteria (Frozen)
- [x] Zero access to functional pages without a verified locked-in MetaMask account.
- [x] 100% Repository Audit accuracy for features verified via the Scouter.
- [x] Automated payout settlement via Chainlink Functions.
- [x] Full mobile responsiveness for all viewing devices.

---

> This document represents the **final, frozen requirements** for the Web3SSH-Ascendant platform. No further architectural changes are permitted without version increment.
