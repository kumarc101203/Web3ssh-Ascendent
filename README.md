# 🌐⛓️ Web3SSH-Ascendant: Web3 AI Escrow

## 🚀 Overview

**Web3SSH-Ascendant** is a high-fidelity, identity-locked decentralized escrow platform. It bridges the gap between subjective work evaluation and objective blockchain enforcement by integrating **Gemini AI Repository Auditing** with **Chainlink Functions** for automated, evidence-based settlements.

Traditional smart contracts lack the ability to resolve complex or subjective disputes—such as evaluating freelance work quality or interpreting agreement terms. Web3SSH-Ascendant addresses this limitation by integrating AI-driven analysis with blockchain-based enforcement for fast, fair, and transparent conflict resolution.

---

## ✨ Key Features

- 🔒 **Identity-Locked Security**: All functional modules (Services, Disputes, Freelancer Dashboard) are locked behind a mandatory **MetaMask** connection.
- 🛡️ **Forced Account Selector**: Connection flows force the MetaMask account selector to appear every time, preventing silent session re-use and ensuring correct identity verification.
- 🛑 **Manual Security Controls**: Instant "Disconnect" functionality allows users to revoke session access immediately, reducing network exposure.
- 🛰️ **Real-Data AI Auditing**: The **Deep-Discovery AI Engine** performs real-time repository audits by physically "scouting" the target GitHub repository's file tree and key source contents.
- 🧠 **Evidence-Based Evaluation**: Gemini AI analyzes actual code snippets to verify feature implementation.
- ⚖️ **Oracle-Driven Settlements**: Chainlink Functions act as the bridge, triggering smart contract payouts only once the AI has verified the work deliverables.

---

## 🔄 FLOW
```text
┌──────────────────────┐    ┌──────────────────────┐    ┌───────────────────────┐
│                      │    │                      │    │                       │
│   Web3 Platform      │    │  Chainlink Oracle    │    │   Gemini AI           │
│   (Wallet Guarded)   │    │  Network             │    │   Auditor             │
│                      │    │                      │    │                       │
│  - Identity Lock     │◄──►│  - Request           │◄──►│  - GitHub Scouting    │
│  - Escrow logic      │    │    dispatching       │    │  - Code Evidence      │
│  - Manual Security   │    │  - Response          │    │    verification       │
│                      │    │    aggregation       │    │  - Scoring & Verdict  │
└──────────────────────┘    └──────────────────────┘    └───────────────────────┘
```

---

## 🛠️ Technical Architecture & Tech Stack

### 🖥️ Frontend
- **Framework**: React.js with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, GSAP for animations
- **Web3 Provider**: MetaMask / ethers.js

### ⚙️ Backend (AI Engine)
- **Framework**: FastAPI (Python)
- **AI Model**: Google Gemini (1.5 Flash / 2.0 Flash) with auto-discovery and OpenAI GPT-4o fallback options.
- **External Integration**: GitHub API for live repository scouting.

### ⛓️ Smart Contracts & Oracle
- **Contracts**: Solidity
- **Environment**: Hardhat
- **Network**: Sepolia Testnet
- **Oracle Layer**: Chainlink Functions for secure off-chain computation.

---

## 📁 Folder Structure

```text
Web3SSH-Ascendant/
├── src/                          # Frontend React Application
│   ├── components/               # Reusable UI components (WalletGuard, Header, etc.)
│   ├── pages/                    # Main application pages
│   ├── context/                  # React Context providers
│   └── main.tsx                  # Application entry point
├── smart-contract-UI/
│   └── backend/                  # Python FastAPI Backend
│       ├── gemini_analyzer.py    # Core AI Analysis & GitHub Scouter logic
│       ├── requirements.txt      # Python dependencies
│       └── test_scouter.py       # Helper script for testing repository scanning
├── hardhat/                      # Smart Contract Development Environment
│   ├── contracts/                # Solidity smart contracts
│   ├── scripts/                  # Deployment scripts
│   └── test/                     # Contract test suites
├── .env                          # Environment variables configuration
├── package.json                  # Node.js dependencies and scripts
├── vite.config.ts                # Vite configuration
└── README.md                     # Project documentation
```

---

## ⚙️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Python](https://www.python.org/) (3.9 or higher)
- MetaMask Extension installed in your browser

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/web3ssh-ASCendant--main.git
cd web3ssh-ASCendant--main
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and add the following configuration:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Backend URL
VITE_BACKEND_URL=http://localhost:8000

# AI Models API Keys
GEMINI_API_KEY=your_google_gemini_api_key
OPENAI_API_KEY=your_openai_api_key # Optional: If you prefer to use OpenAI
```

### 3. Setup Frontend
Install Node.js dependencies and start the Vite development server:
```bash
npm install
npm run dev
```
The frontend will be accessible at `http://localhost:5173`.

### 4. Setup Backend (AI Engine)
Open a new terminal window, navigate to the backend directory, install Python dependencies, and start the FastAPI server:
```bash
cd smart-contract-UI/backend
pip install -r requirements.txt
python gemini_analyzer.py
```
The backend server will run at `http://localhost:8000`.

---

## 💡 How It Works (The Escrow Flow)

1. **Dispute Initiation & Agreement**: Disputing parties agree on terms, and funds are locked securely in the smart contract escrow.
2. **Work Submission**: The freelancer submits their deliverable (a GitHub repository URL).
3. **Data-Driven Evaluation**: The backend `GitHubScouter` fetches the repository structure and specific source code snippets. Gemini AI performs a high-fidelity audit against project requirements to ensure no functionality was missed.
4. **Blockchain Enforcement**: Chainlink Functions validate the AI's objective decision and trigger the necessary payout on-chain.

---

> **Web3SSH-Ascendant** brings trust, speed, and physical code evidence to Web3 disputes—bridging the gap between smart contracts and real-world judgment for a secure and accurate decentralized future.
