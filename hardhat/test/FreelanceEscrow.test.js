const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FreelanceEscrow — AI-Triggered Autonomous Payout", function () {
  let mockRouter;
  let escrow;
  let client, freelancer, stranger;
  const ESCROW_AMOUNT = ethers.parseEther("1.0");
  const DUMMY_DON_ID = ethers.encodeBytes32String("test-don");
  const DUMMY_SUB_ID = 1;
  const JS_SOURCE = 'return Functions.encodeUint256(85);'; // Dummy source

  async function deployFixture() {
    [client, freelancer, stranger] = await ethers.getSigners();

    // Deploy Mock Router
    const MockRouter = await ethers.getContractFactory("MockFunctionsRouter");
    mockRouter = await MockRouter.deploy();
    await mockRouter.waitForDeployment();

    // Deploy Escrow with mock router
    const Escrow = await ethers.getContractFactory("FreelanceEscrow");
    escrow = await Escrow.connect(client).deploy(
      await mockRouter.getAddress(),
      DUMMY_DON_ID,
      DUMMY_SUB_ID,
      freelancer.address,
      { value: ESCROW_AMOUNT }
    );
    await escrow.waitForDeployment();
  }

  // Helper: encode a score as abi.encode(uint256)
  function encodeScore(score) {
    return ethers.AbiCoder.defaultAbiCoder().encode(["uint256"], [score]);
  }

  // Helper: get the latestRequestId from the contract
  async function getRequestId() {
    return await escrow.latestRequestId();
  }

  beforeEach(async function () {
    await deployFixture();
  });

  // ========================================
  // Basic State Transition Tests
  // ========================================

  describe("Deployment & Initial State", function () {
    it("Should deploy with correct initial state", async function () {
      expect(await escrow.client()).to.equal(client.address);
      expect(await escrow.freelancer()).to.equal(freelancer.address);
      expect(await escrow.totalAmount()).to.equal(ESCROW_AMOUNT);
      expect(await escrow.status()).to.equal(0); // Created
    });
  });

  describe("Work Submission", function () {
    it("Freelancer can submit work", async function () {
      await escrow.connect(freelancer).submitWork();
      expect(await escrow.status()).to.equal(1); // WorkSubmitted
    });

    it("Client cannot submit work", async function () {
      await expect(escrow.connect(client).submitWork()).to.be.revertedWith("Only freelancer allowed");
    });

    it("Cannot submit work twice", async function () {
      await escrow.connect(freelancer).submitWork();
      await expect(escrow.connect(freelancer).submitWork()).to.be.revertedWith("Invalid status");
    });
  });

  describe("Evaluation Request", function () {
    it("Can request evaluation after work is submitted", async function () {
      await escrow.connect(freelancer).submitWork();
      await escrow.connect(client).requestEvaluation(JS_SOURCE, []);
      expect(await escrow.status()).to.equal(2); // AwaitingOracle
    });

    it("Cannot request evaluation before work is submitted", async function () {
      await expect(
        escrow.connect(client).requestEvaluation(JS_SOURCE, [])
      ).to.be.revertedWith("Work not submitted yet");
    });

    it("Stranger cannot request evaluation", async function () {
      await escrow.connect(freelancer).submitWork();
      await expect(
        escrow.connect(stranger).requestEvaluation(JS_SOURCE, [])
      ).to.be.revertedWith("Not authorized");
    });

    it("Emits EvaluationRequested event", async function () {
      await escrow.connect(freelancer).submitWork();
      await expect(escrow.connect(client).requestEvaluation(JS_SOURCE, []))
        .to.emit(escrow, "EvaluationRequested");
    });
  });

  // ========================================
  // Payout Logic Tests
  // ========================================

  describe("Score < 50 → Full Refund to Client", function () {
    it("Score 40: Client gets 100% refund", async function () {
      await escrow.connect(freelancer).submitWork();
      await escrow.connect(client).requestEvaluation(JS_SOURCE, []);
      const requestId = await getRequestId();

      const escrowBalBefore = await ethers.provider.getBalance(await escrow.getAddress());

      await mockRouter.fulfillRequest(requestId, encodeScore(40), "0x");

      const escrowBalAfter = await ethers.provider.getBalance(await escrow.getAddress());
      // All funds should leave the escrow
      expect(escrowBalBefore).to.equal(ESCROW_AMOUNT);
      expect(escrowBalAfter).to.equal(0);
      expect(await escrow.status()).to.equal(3); // Resolved
      expect(await escrow.latestAiScore()).to.equal(40);
    });

    it("Score 0: Client gets 100% refund", async function () {
      await escrow.connect(freelancer).submitWork();
      await escrow.connect(client).requestEvaluation(JS_SOURCE, []);
      const requestId = await getRequestId();

      await mockRouter.fulfillRequest(requestId, encodeScore(0), "0x");

      expect(await escrow.latestAiScore()).to.equal(0);
      expect(await escrow.status()).to.equal(3);
    });
  });

  describe("Score 50-89 → Proportional Split", function () {
    it("Score 75: Freelancer gets 75%, Client gets 25%", async function () {
      await escrow.connect(freelancer).submitWork();
      await escrow.connect(client).requestEvaluation(JS_SOURCE, []);
      const requestId = await getRequestId();

      const freelancerBalBefore = await ethers.provider.getBalance(freelancer.address);

      await mockRouter.fulfillRequest(requestId, encodeScore(75), "0x");

      const freelancerBalAfter = await ethers.provider.getBalance(freelancer.address);
      const escrowBalAfter = await ethers.provider.getBalance(await escrow.getAddress());

      const expectedFreelancer = (ESCROW_AMOUNT * 75n) / 100n;

      expect(freelancerBalAfter - freelancerBalBefore).to.equal(expectedFreelancer);
      // Escrow should be fully drained
      expect(escrowBalAfter).to.equal(0);
      expect(await escrow.latestAiScore()).to.equal(75);
    });

    it("Score 50: Freelancer gets 50%, Client gets 50%", async function () {
      await escrow.connect(freelancer).submitWork();
      await escrow.connect(client).requestEvaluation(JS_SOURCE, []);
      const requestId = await getRequestId();

      const freelancerBalBefore = await ethers.provider.getBalance(freelancer.address);

      await mockRouter.fulfillRequest(requestId, encodeScore(50), "0x");

      const freelancerBalAfter = await ethers.provider.getBalance(freelancer.address);
      const expectedFreelancer = (ESCROW_AMOUNT * 50n) / 100n;

      expect(freelancerBalAfter - freelancerBalBefore).to.equal(expectedFreelancer);
      expect(await escrow.latestAiScore()).to.equal(50);
    });
  });

  describe("Score >= 90 → Full Payment to Freelancer", function () {
    it("Score 95: Freelancer gets 100%", async function () {
      await escrow.connect(freelancer).submitWork();
      await escrow.connect(client).requestEvaluation(JS_SOURCE, []);
      const requestId = await getRequestId();

      const freelancerBalBefore = await ethers.provider.getBalance(freelancer.address);

      await mockRouter.fulfillRequest(requestId, encodeScore(95), "0x");

      const freelancerBalAfter = await ethers.provider.getBalance(freelancer.address);
      expect(freelancerBalAfter - freelancerBalBefore).to.equal(ESCROW_AMOUNT);
      expect(await escrow.latestAiScore()).to.equal(95);
    });

    it("Score 90: Freelancer gets 100% (boundary)", async function () {
      await escrow.connect(freelancer).submitWork();
      await escrow.connect(client).requestEvaluation(JS_SOURCE, []);
      const requestId = await getRequestId();

      const freelancerBalBefore = await ethers.provider.getBalance(freelancer.address);

      await mockRouter.fulfillRequest(requestId, encodeScore(90), "0x");

      const freelancerBalAfter = await ethers.provider.getBalance(freelancer.address);
      expect(freelancerBalAfter - freelancerBalBefore).to.equal(ESCROW_AMOUNT);
    });

    it("Score 100: Freelancer gets 100%", async function () {
      await escrow.connect(freelancer).submitWork();
      await escrow.connect(client).requestEvaluation(JS_SOURCE, []);
      const requestId = await getRequestId();

      await mockRouter.fulfillRequest(requestId, encodeScore(100), "0x");
      expect(await escrow.latestAiScore()).to.equal(100);
    });
  });

  // ========================================
  // Security & Edge Case Tests
  // ========================================

  describe("Security Hardening", function () {
    it("Rejects score > 100", async function () {
      await escrow.connect(freelancer).submitWork();
      await escrow.connect(client).requestEvaluation(JS_SOURCE, []);
      const requestId = await getRequestId();

      // Score 101 should revert with InvalidScore via the callback
      await expect(
        mockRouter.fulfillRequest(requestId, encodeScore(101), "0x")
      ).to.be.reverted;
    });

    it("Cannot resolve twice (repeated callback)", async function () {
      await escrow.connect(freelancer).submitWork();
      await escrow.connect(client).requestEvaluation(JS_SOURCE, []);
      const requestId = await getRequestId();

      await mockRouter.fulfillRequest(requestId, encodeScore(85), "0x");

      // Second fulfillment with same requestId should fail (request no longer pending in mock)
      await expect(
        mockRouter.fulfillRequest(requestId, encodeScore(85), "0x")
      ).to.be.reverted;
    });

    it("Oracle error resets state to WorkSubmitted", async function () {
      await escrow.connect(freelancer).submitWork();
      await escrow.connect(client).requestEvaluation(JS_SOURCE, []);
      const requestId = await getRequestId();

      // Simulate oracle error (non-empty err bytes)
      const errorBytes = ethers.toUtf8Bytes("Oracle timeout");
      await mockRouter.fulfillRequest(requestId, "0x", errorBytes);

      // Status should be back to WorkSubmitted so they can retry
      expect(await escrow.status()).to.equal(1); // WorkSubmitted
    });
  });

  describe("Events", function () {
    it("Emits FundsDistributed with correct values", async function () {
      await escrow.connect(freelancer).submitWork();
      await escrow.connect(client).requestEvaluation(JS_SOURCE, []);
      const requestId = await getRequestId();

      const expectedFreelancer = (ESCROW_AMOUNT * 75n) / 100n;
      const expectedClient = ESCROW_AMOUNT - expectedFreelancer;

      await expect(mockRouter.fulfillRequest(requestId, encodeScore(75), "0x"))
        .to.emit(escrow, "FundsDistributed")
        .withArgs(requestId, 75, expectedFreelancer, expectedClient, (v) => v > 0);
    });
  });
});
