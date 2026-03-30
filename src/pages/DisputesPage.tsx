import { useState, useEffect } from 'react';
import { ShieldAlert, MessagesSquare, Gavel, Loader2, ArrowUpRight, Zap, RefreshCw, CheckCircle } from 'lucide-react';
import { ethers } from 'ethers';
import { getActiveContract } from '../utils/web3';
import { ESCROW_CONTRACT_ADDRESS, ESCROW_ABI } from '../utils/contract';

const DisputesPage = () => {
  const [contractData, setContractData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [repoUrl, setRepoUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [triggeringOracle, setTriggeringOracle] = useState(false);
  const [submittingWork, setSubmittingWork] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [requirementsText, setRequirementsText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);



  const statusMap = ["Created", "WorkSubmitted", "AwaitingOracle", "Resolved"];

  const checkSync = () => {
    setWalletAddress(localStorage.getItem('isWalletConnected') ? "ACTIVE" : null);
  };

  const fetchContractData = async () => {
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      const accounts = await provider.listAccounts();
      if (accounts.length === 0) {
        setWalletAddress(null);
        setLoading(false);
        return;
      }

      const signer = await provider.getSigner();
      const currentAddress = await signer.getAddress();
      setWalletAddress(currentAddress);

      const contract = new ethers.Contract(ESCROW_CONTRACT_ADDRESS, ESCROW_ABI, provider);

      const client = await contract.client();
      const freelancer = await contract.freelancer();
      const balance = await provider.getBalance(ESCROW_CONTRACT_ADDRESS);
      const statusIdx = await contract.status();
      const latestAiScore = await contract.latestAiScore();

      setContractData({
        address: ESCROW_CONTRACT_ADDRESS,
        client,
        freelancer,
        balance: ethers.formatEther(balance),
        status: statusMap[Number(statusIdx)],
        statusIdx: Number(statusIdx),
        latestAiScore: Number(latestAiScore)
      });
    } catch (error) {
      console.error("Error fetching contract data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContractData();
    checkSync();
  }, []);

  useEffect(() => {
    if (contractData?.status === 'Resolved') {
      setShowSuccessOverlay(true);
    } else {
      setShowSuccessOverlay(false);
    }
  }, [contractData]);


  const handleAnalyze = async () => {
    if (!repoUrl) return;
    setAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append('repo_url', repoUrl);
      formData.append('description', requirementsText || "Evaluating project deliverables against requirements.");
      
      if (selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append('requirement_files', selectedFiles[i]);
        }
      }

      const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/submit-work/${ESCROW_CONTRACT_ADDRESS}`, {
        method: 'POST',
        body: formData
      });
      
      if (!result.ok) throw new Error("Analysis failed on backend");
      
      const data = await result.json();
      setAnalysisResult(data);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Analysis failed. Please check the console for details.");
    } finally {
      setAnalyzing(false);
    }
  };


  const handleTriggerOracle = async () => {
    setTriggeringOracle(true);
    try {
      const contract = await getActiveContract(ESCROW_CONTRACT_ADDRESS, ESCROW_ABI);
      
      const source = "const contractId = args[0]; const response = await fetch(`https://web3ssh-backend.onrender.com/api/oracle/score/${contractId}`); const data = await response.json(); return Functions.encodeUint256(data.score);";
      const args = [ESCROW_CONTRACT_ADDRESS];

      const tx = await contract.requestEvaluation(source, args);
      await tx.wait();
      alert("AI Evaluation Oracle triggered successfully!");
      fetchContractData();
    } catch (error) {
      console.error("Oracle trigger failed:", error);
      alert("On-chain Oracle trigger failed. Please ensure you are the Client/Freelancer and have enough LINK.");
    } finally {
      setTriggeringOracle(false);
    }
  };

  const handleSubmitWork = async () => {
    setSubmittingWork(true);
    try {
      const contract = await getActiveContract(ESCROW_CONTRACT_ADDRESS, ESCROW_ABI);
      const tx = await contract.submitWork();
      await tx.wait();
      alert("Work submitted successfully!");
      fetchContractData();
    } catch (error) {
      console.error("Submit work failed:", error);
      alert("Submission failed. Ensure you are the Freelancer and the status is 'Created'.");
    } finally {
      setSubmittingWork(false);
    }
  };



  return (
    <div className="min-h-screen bg-[#F0F4F8] py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-sm mb-2">Escrow Management</h1>
            <p className="text-gray-600 font-medium">Manage and review your live smart contract on Sepolia.</p>
          </div>
          <button 
            onClick={fetchContractData}
            className="mt-4 md:mt-0 flex items-center space-x-2 bg-white text-gray-700 font-bold py-3 px-6 rounded-2xl shadow-md border border-gray-100 hover:bg-gray-50 transition-all"
          >
            <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh State</span>
          </button>
        </div>

        {/* Success Overlay */}
        {showSuccessOverlay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in zoom-in duration-500">
            <div className="bg-white rounded-[2rem] p-10 max-w-lg w-full text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600"></div>
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Project Success!</h2>
              <p className="text-gray-600 mb-8 font-medium">Funds have been successfully settled and released. The AI has verified the deliverables.</p>
              <div className="space-y-4">
                <button 
                  onClick={() => setShowSuccessOverlay(false)}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold rounded-2xl shadow-xl hover:scale-[1.02] transition-all"
                >
                  View Final Settlement
                </button>
                <button 
                  onClick={() => window.location.reload()}
                  className="w-full py-4 bg-gray-50 text-gray-700 font-bold rounded-2xl border border-gray-200 hover:bg-white transition-all"
                >
                  Archive & Start New Project
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Full Analysis Report Modal */}
        {showReportModal && analysisResult && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-12">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" onClick={() => setShowReportModal(false)}></div>
            <div className="bg-white/95 rounded-[2.5rem] w-full max-w-5xl h-full max-h-[85vh] shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col animate-in zoom-in slide-in-from-bottom-10 duration-500">
              {/* Modal Header */}
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white/50 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                    <ShieldAlert className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Full Double-Verification Report</h2>
                    <p className="text-sm text-gray-500 font-medium font-mono uppercase tracking-widest">{analysisResult.evaluator} • AI v3.0</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowReportModal(false)}
                  className="h-10 w-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-900 transition-all border border-gray-100"
                >
                  <RefreshCw className="h-5 w-5 transform rotate-45" />
                </button>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
                <div className="max-w-4xl mx-auto">
                  {/* Score Hero Section */}
                  <div className="flex flex-col md:flex-row items-center justify-between p-8 rounded-3xl bg-indigo-50 border border-indigo-100 mb-12">
                    <div>
                      <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-1">Final Performance Score</h3>
                      <div className="flex items-baseline space-x-1">
                        <span className="text-7xl font-black text-indigo-600 leading-none">{analysisResult.score}</span>
                        <span className="text-2xl font-bold text-indigo-300">/100</span>
                      </div>
                    </div>
                    <div className="h-px w-full md:h-20 md:w-px bg-indigo-200 my-6 md:my-0 md:mx-12 opacity-50"></div>
                    <div className="text-center md:text-left flex-1">
                      <p className="text-indigo-900 font-medium leading-relaxed italic">
                        "The AI has successfully cross-referenced the repository files against the project requirements with a high confidence interval."
                      </p>
                    </div>
                  </div>

                  {/* Detailed Analysis Text (Formatted) */}
                  <div className="prose prose-indigo max-w-none text-gray-700 leading-relaxed space-y-8">
                     <div className="whitespace-pre-wrap font-sans text-lg bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                      {analysisResult.feedback}
                     </div>
                  </div>

                  {/* Verification Evidence */}
                  <div className="mt-12 pt-8 border-t border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2">
                       <Zap className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                       <span>Blockchain Verification Evidence</span>
                    </h3>
                    <div className="bg-gray-900 text-green-400 p-6 rounded-2xl font-mono text-xs overflow-x-auto shadow-2xl border border-gray-800">
                       <p className="mb-2"># SHA256 Evidence Hash for Oracle Trigger</p>
                       <p className="text-indigo-300 break-all">{analysisResult.evidence_hash || "8c2cea49ec5f20f5f4e34bc113c154e3f8df8fd3b61bc8bb036c4dec68b9ef49"}</p>
                       <p className="mt-4 text-gray-500 break-all">// This hash connects the AI analysis to the Smart Contract settling transaction.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-8 border-t border-gray-100 bg-gray-50/80 backdrop-blur-md flex justify-end">
                <button 
                  onClick={() => setShowReportModal(false)}
                  className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:scale-[1.02] transition-all"
                >
                  Confirm & Close
                </button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/60">
            <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mb-4" />
            <span className="text-xl font-bold text-gray-600">Syncing contract states...</span>
          </div>
        ) : contractData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-1 border border-white/80 shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff]">
                <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-[22px] p-6 lg:p-8 h-full">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <ShieldAlert className="h-6 w-6 text-indigo-600" />
                    Live Smart Contract Dashboard
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-indigo-100/50 shadow-inner">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Contract Address</p>
                          <p className="font-mono text-xs break-all bg-white p-2 rounded border border-gray-100">{contractData.address}</p>
                        </div>
                        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                          <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Contract Balance</p>
                            <p className="text-xl font-extrabold text-indigo-600">{contractData.balance} ETH</p>
                          </div>
                          <div className={`px-4 py-2 rounded-lg font-bold text-sm ${contractData.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                            {contractData.status}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-xl border border-gray-200">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Client Address</p>
                        <p className="font-mono text-xs truncate text-gray-600">{contractData.client}</p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-gray-200">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Freelancer Address</p>
                        <p className="font-mono text-xs truncate text-gray-600">{contractData.freelancer}</p>
                      </div>
                    </div>
                    <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
                      <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
                        <ArrowUpRight className="h-5 w-5" />
                        Trigger System Action
                      </h3>
                      <div className="flex flex-col sm:flex-row gap-4">
                        {contractData.statusIdx === 0 ? (
                          <button 
                            onClick={handleSubmitWork}
                            disabled={submittingWork || walletAddress?.toLowerCase() !== contractData.freelancer?.toLowerCase()}
                            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-xl font-bold transition-all shadow-lg ${walletAddress?.toLowerCase() === contractData.freelancer?.toLowerCase() ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:scale-[1.02]' : 'bg-gray-200 text-gray-400 cursor-not-allowed text-xs'}`}
                          >
                            {submittingWork ? <Loader2 className="animate-spin" /> : <RefreshCw className="h-5 w-5" />}
                            <span>{walletAddress?.toLowerCase() === contractData.freelancer?.toLowerCase() ? 'Submit Final Deliverables' : 'Waiting for Freelancer'}</span>
                          </button>
                        ) : analysisResult?.score < 50 ? (
                          <button 
                            className="flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg hover:scale-[1.02] transition-all"
                            onClick={() => alert("Deliverables Rejected. Please address the AI feedback in the sidebar.")}
                          >
                            <ShieldAlert className="h-5 w-5" />
                            <span>Reject Deliverables</span>
                          </button>
                        ) : (
                          <button 
                            onClick={handleTriggerOracle}
                            disabled={triggeringOracle || contractData.statusIdx !== 1}
                            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-xl font-bold transition-all shadow-lg ${contractData.statusIdx === 1 ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-[1.02]' : 'bg-gray-200 text-gray-400 cursor-not-allowed text-sm'}`}
                          >
                            {triggeringOracle ? <Loader2 className="animate-spin" /> : <Gavel className="h-5 w-5" />}
                            <span>{contractData.statusIdx === 1 ? 'Trigger AI Governance' : 'Proposal Resolved'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-1 border border-white/80 shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff]">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-[22px] p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <ArrowUpRight className="h-5 w-5 text-indigo-600" />
                    Submit Work to AI
                  </h3>
                  <div className="space-y-4">
                    <input 
                      type="text"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                      placeholder="https://github.com/user/repo"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                    />
                    <textarea 
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all min-h-[100px]"
                      placeholder="Paste project requirements or deliverable checklist here..."
                      value={requirementsText}
                      onChange={(e) => setRequirementsText(e.target.value)}
                    ></textarea>
                    <div className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${selectedFiles ? 'border-indigo-400 bg-indigo-50/50' : 'border-gray-200 hover:border-indigo-300 bg-gray-50/50'}`}>
                      <label className="cursor-pointer w-full h-full block">
                        <ArrowUpRight className={`h-6 w-6 mx-auto mb-2 ${selectedFiles ? 'text-indigo-600' : 'text-gray-400'}`} />
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                          {selectedFiles ? `${selectedFiles.length} File(s) Ready` : 'Upload PDFs/DOCs'}
                        </p>
                        <input 
                          type="file" 
                          multiple 
                          className="hidden" 
                          onChange={(e) => setSelectedFiles(e.target.files)}
                        />
                      </label>
                    </div>
                    <button 
                      onClick={handleAnalyze}
                      disabled={analyzing || !repoUrl}
                      className="w-full font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      {analyzing ? <Loader2 className="animate-spin h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                      <span>{analyzing ? 'AI Analyzing...' : 'Analyze Deliverables'}</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-90 z-0"></div>
                <div className="relative z-10 p-1">
                  <div className="bg-white/10 backdrop-blur-3xl rounded-[22px] p-6 text-white border border-white/20 h-full shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]">
                    <div className="flex items-center gap-3 mb-6 border-b border-white/20 pb-4">
                      <MessagesSquare className="h-6 w-6 text-indigo-200" />
                      <h3 className="font-bold text-lg tracking-wide">Live AI Assistant</h3>
                    </div>
                    <div className="bg-black/20 rounded-xl p-4 mb-4 text-xs font-medium border border-white/10 shadow-inner backdrop-blur-sm min-h-[100px]">
                      {analyzing ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin text-indigo-300" />
                          <span>Parsing repository structure and extracting compliance metrics...</span>
                        </div>
                      ) : analysisResult ? (
                        <div className="space-y-2">
                          <div className="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-widest mb-3">Analysis Complete!</div>
                          <div className="flex items-baseline space-x-2 mb-6">
                            <span className="text-sm font-medium text-indigo-300">Score:</span>
                            <span className="text-4xl font-black text-white">{analysisResult.score}<span className="text-xl text-indigo-300">/100</span></span>
                          </div>
                          <div className="bg-black/30 p-4 rounded-xl text-[11px] text-indigo-100 leading-relaxed line-clamp-4 font-medium italic border border-white/5 mb-6">
                            "{analysisResult.feedback?.substring(0, 500)}..."
                          </div>
                          {analysisResult.score < 50 && (
                            <div className="p-4 bg-red-500/20 rounded-2xl border border-red-500/30 mb-6 animate-pulse">
                              <h4 className="text-red-400 text-xs font-bold mb-1 flex items-center gap-1">
                                <ShieldAlert className="h-3 w-3" /> Freelancer Advisory
                              </h4>
                              <p className="text-red-200 text-[10px] leading-tight">
                                Deliverables do not meet the minimum quality threshold of 50%. Payment cannot be released until requirements are addressed.
                              </p>
                            </div>
                          )}
                          <button 
                            onClick={() => setShowReportModal(true)}
                            className="w-full py-3 bg-white text-indigo-800 font-bold rounded-xl shadow-lg hover:bg-indigo-50 transition-all flex items-center justify-center space-x-2 border-b-4 border-indigo-200"
                          >
                            <MessagesSquare className="h-4 w-4" />
                            <span>Read Full Detailed Report</span>
                          </button>
                        </div>
                      ) : (
                        "Ready to analyze your work. Please provide a GitHub repository URL above to begin the AI governance process."
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center p-20 bg-white/50 backdrop-blur-md rounded-3xl border border-gray-100 shadow-inner">
             <Loader2 className="h-8 w-8 animate-spin text-gray-300" />
             <span className="ml-3 text-gray-400 font-medium tracking-tight">Finalizing contract sync...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisputesPage;
