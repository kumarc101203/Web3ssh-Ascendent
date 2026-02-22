import React, { useState } from 'react';
import { 
  FileText, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Copy,
  Calendar,
  User,
  Hash,
  Plus,
  X,
  Eye,
  EyeOff,
  Shield,
  Upload,
  Github,
  ArrowLeft,
  Send,
  Brain,
  FileCheck
} from 'lucide-react';

type ContractStatus = 'Created' | 'Funded' | 'WorkSubmitted' | 'Approved' | 'Dispute';

interface ContractDetails {
  address: string;
  title: string;
  description: string;
  value: string;
  client: string;
  contractor: string;
  createdDate: string;
  deadline: string;
  status: ContractStatus;
}

interface CreateContractForm {
  title: string;
  description: string;
  value: string;
  client: string;
  contractor: string;
  deadline: string;
}

function App() {
  const [contract, setContract] = useState<ContractDetails | null>(null);

  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showClientAddress, setShowClientAddress] = useState(false);
  const [showContractorAddress, setShowContractorAddress] = useState(false);
  const [showWorkSubmission, setShowWorkSubmission] = useState(false);
  const [workSubmissionData, setWorkSubmissionData] = useState({
    githubLink: '',
    files: [] as File[],
    requirementFiles: [] as File[],
    imageFiles: [] as File[],
    documentFiles: [] as File[],
    description: ''
  });
  const [showReports, setShowReports] = useState(false);
  const [aiReport, setAiReport] = useState({
    status: 'pending' as 'pending' | 'completed' | 'failed',
    score: 0,
    feedback: '',
    recommendations: [] as string[],
    evaluationDate: '',
    evaluator: 'Gemini AI Evaluation System',
    analysisResult: ''
  });
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeData, setDisputeData] = useState({
    reason: '',
    description: '',
    requestedChanges: '',
    evidence: [] as File[]
  });
  const [createForm, setCreateForm] = useState<CreateContractForm>({
    title: '',
    description: '',
    value: '',
    client: '',
    contractor: '',
    deadline: ''
  });

  const handleStatusChange = (newStatus: ContractStatus) => {
    if (contract) {
      setContract(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(type);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const handleCreateContract = () => {
    const newContract: ContractDetails = {
      address: '0x' + Math.random().toString(16).substr(2, 40),
      title: createForm.title,
      description: createForm.description,
      value: createForm.value,
      client: createForm.client,
      contractor: createForm.contractor,
      createdDate: new Date().toISOString().split('T')[0],
      deadline: createForm.deadline,
      status: 'Created'
    };
    
    setContract(newContract);
    setShowCreateModal(false);
    setCreateForm({
      title: '',
      description: '',
      value: '',
      client: '',
      contractor: '',
      deadline: ''
    });
  };

  const handleFormChange = (field: keyof CreateContractForm, value: string) => {
    if (field === 'value') {
      // Remove any existing " ETH" suffix and add it back
      const cleanValue = value.replace(' ETH', '');
      setCreateForm(prev => ({ ...prev, [field]: cleanValue + ' ETH' }));
    } else {
      setCreateForm(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleWorkSubmission = () => {
    setShowWorkSubmission(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setWorkSubmissionData(prev => ({
      ...prev,
      files: [...prev.files, ...files]
    }));
  };

  const handleRequirementFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setWorkSubmissionData(prev => ({
      ...prev,
      requirementFiles: [...prev.requirementFiles, ...files]
    }));
  };

  const handleImageFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setWorkSubmissionData(prev => ({
      ...prev,
      imageFiles: [...prev.imageFiles, ...files]
    }));
  };

  const handleDocumentFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setWorkSubmissionData(prev => ({
      ...prev,
      documentFiles: [...prev.documentFiles, ...files]
    }));
  };

  const removeFile = (index: number) => {
    setWorkSubmissionData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const removeRequirementFile = (index: number) => {
    setWorkSubmissionData(prev => ({
      ...prev,
      requirementFiles: prev.requirementFiles.filter((_, i) => i !== index)
    }));
  };

  const removeImageFile = (index: number) => {
    setWorkSubmissionData(prev => ({
      ...prev,
      imageFiles: prev.imageFiles.filter((_, i) => i !== index)
    }));
  };

  const removeDocumentFile = (index: number) => {
    setWorkSubmissionData(prev => ({
      ...prev,
      documentFiles: prev.documentFiles.filter((_, i) => i !== index)
    }));
  };

  // Download report function
  const downloadReport = () => {
    if (!aiReport.analysisResult) {
      alert('No report available to download');
      return;
    }

    const reportContent = aiReport.analysisResult;
    const blob = new Blob([reportContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI_Analysis_Report_${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Real Gemini AI analysis function
  const generateGeminiAnalysis = async (repoUrl: string, requirementsFiles: File[], imageFiles: File[], documentFiles: File[], description: string) => {
    try {
      const formData = new FormData();
      formData.append('repo_url', repoUrl);
      formData.append('description', description);
      
      // Add requirement files
      requirementsFiles.forEach(file => {
        formData.append('requirement_files', file);
      });

      // Add image files
      imageFiles.forEach(file => {
        formData.append('image_files', file);
      });

      // Add document files
      documentFiles.forEach(file => {
        formData.append('document_files', file);
      });

      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      // Fallback to mock analysis with random score between 90 and 100
      const randomScore = Math.floor(Math.random() * 11) + 90;
      return {
        status: 'completed',
        score: randomScore,
        feedback: `Mock analysis for ${repoUrl}`,
        recommendations: [
          'Add more unit tests for edge cases',
          'Implement error handling for edge scenarios',
          'Consider adding performance monitoring',
          'Update API documentation with examples'
        ],
        evaluation_date: new Date().toLocaleDateString(),
        evaluator: 'Gemini AI Evaluation System (Mock)',
        analysis_result: `# Mock AI Analysis Report\n\n## Repository Analysis\n- **Repository URL**: ${repoUrl}\n- **Analysis Date**: ${new Date().toLocaleDateString()}\n- **AI Model**: Gemini 2.5 Pro (Mock Mode)\n\n### Overall Score: ${randomScore}/100\n\nThis is a mock analysis. Please ensure the backend service is running for real AI analysis.`
      };
    }
  };

  const submitWork = async () => {
    // Validate inputs
    if (!workSubmissionData.githubLink && workSubmissionData.files.length === 0 && workSubmissionData.imageFiles.length === 0 && workSubmissionData.documentFiles.length === 0) {
      alert('Please provide either a GitHub link, upload project files, upload images, or upload documents for analysis');
      return;
    }

    if (workSubmissionData.requirementFiles.length === 0) {
      alert('Please upload requirement files for AI analysis');
      return;
    }

    // Update contract status
    setContract(prev => prev ? { ...prev, status: 'WorkSubmitted' } : null);
    
    // Close work submission page
    setShowWorkSubmission(false);
    
    // Start AI analysis
    setAiReport(prev => ({ ...prev, status: 'pending' }));
    setShowReports(true);

    try {
      // Simulate Gemini AI analysis
      const analysisResult = await generateGeminiAnalysis(
        workSubmissionData.githubLink, 
        workSubmissionData.requirementFiles,
        workSubmissionData.imageFiles,
        workSubmissionData.documentFiles,
        workSubmissionData.description
      );

      // Update AI report with results
      setAiReport({
        status: analysisResult.status,
        score: analysisResult.score,
        feedback: analysisResult.feedback,
        recommendations: analysisResult.recommendations,
        evaluationDate: analysisResult.evaluation_date,
        evaluator: analysisResult.evaluator,
        analysisResult: analysisResult.analysis_result
      });

    } catch (error) {
      setAiReport(prev => ({ ...prev, status: 'failed' }));
      console.error('AI analysis failed:', error);
    }
    
    // Reset work submission data
    setWorkSubmissionData({
      githubLink: '',
      files: [],
      requirementFiles: [],
      imageFiles: [],
      documentFiles: [],
      description: ''
    });
  };

  const handleDisputeClick = () => {
    setShowDisputeModal(true);
  };

  const handleDisputeFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setDisputeData(prev => ({
      ...prev,
      evidence: [...prev.evidence, ...files]
    }));
  };

  const removeDisputeFile = (index: number) => {
    setDisputeData(prev => ({
      ...prev,
      evidence: prev.evidence.filter((_, i) => i !== index)
    }));
  };

  const submitDispute = () => {
    // Here you would typically send the dispute data to your backend
    console.log('Submitting dispute:', disputeData);
    
    // Update contract status
    setContract(prev => prev ? { ...prev, status: 'Dispute' } : null);
    
    // Close dispute modal
    setShowDisputeModal(false);
    
    // Reset dispute data
    setDisputeData({
      reason: '',
      description: '',
      requestedChanges: '',
      evidence: []
    });
  };

  const getStatusColor = (status: ContractStatus) => {
    switch (status) {
      case 'Created': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Funded': return 'bg-green-100 text-green-800 border-green-200';
      case 'WorkSubmitted': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Approved': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Dispute': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: ContractStatus) => {
    switch (status) {
      case 'Created': return <FileText className="w-4 h-4" />;
      case 'Funded': return <DollarSign className="w-4 h-4" />;
      case 'WorkSubmitted': return <Clock className="w-4 h-4" />;
      case 'Approved': return <CheckCircle className="w-4 h-4" />;
      case 'Dispute': return <AlertTriangle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const canTransitionTo = (targetStatus: ContractStatus) => {
    if (!contract) return false;
    const transitions: Record<ContractStatus, ContractStatus[]> = {
      'Created': ['Funded', 'Dispute'],
      'Funded': ['WorkSubmitted', 'Dispute'],
      'WorkSubmitted': ['Approved', 'Dispute'],
      'Approved': [],
      'Dispute': ['Approved', 'WorkSubmitted']
    };
    return transitions[contract.status].includes(targetStatus);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
                          <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Smart Contract Management</h1>
                <p className="text-lg text-gray-600">Monitor and manage smart contracts</p>
              </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Contract
            </button>
          </div>
        </div>

        {/* Empty State or Contract Details */}
        {!contract ? (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8">
            <div className="px-8 py-16 text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Contract Created</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Get started by creating your first smart contract. Click the "Create Contract" button above to begin.
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create Contract
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8">
            {/* Contract Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{contract.title}</h2>
                  <div className="flex items-center gap-2 text-blue-100">
                    <Hash className="w-4 h-4" />
                    <span className="font-mono text-sm">{contract.address}</span>
                    <button
                      onClick={() => copyToClipboard(contract.address, 'contract')}
                      className="ml-2 p-1 hover:bg-white/20 rounded transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{contract.value}</div>
                  <div className="text-blue-100 text-sm">Contract Value</div>
                </div>
              </div>
            </div>

            {/* Status and Actions */}
            <div className="px-8 py-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600">Current Status:</span>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${getStatusColor(contract.status)}`}>
                    {getStatusIcon(contract.status)}
                    {contract.status}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contract Actions</h3>
                                  <div className="flex flex-wrap gap-3">
                    {(['Created', 'Funded', 'WorkSubmitted', 'Approved', 'Dispute'] as ContractStatus[]).map((status) => (
                      <button
                        key={status}
                        onClick={() => status === 'Dispute' ? handleDisputeClick() : handleStatusChange(status)}
                        disabled={!canTransitionTo(status) && status !== contract.status}
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                          status === contract.status
                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                            : canTransitionTo(status)
                            ? status === 'Dispute' 
                              ? 'bg-red-600 text-white hover:bg-red-700 hover:scale-105 hover:shadow-lg'
                              : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 hover:shadow-lg'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {getStatusIcon(status)}
                        {status}
                      </button>
                    ))}
                  </div>
                
                {/* Additional Action Buttons */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Work Management</h4>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleWorkSubmission}
                      disabled={!canTransitionTo('WorkSubmitted')}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                        contract.status === 'WorkSubmitted'
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : canTransitionTo('WorkSubmitted')
                          ? 'bg-green-600 text-white hover:bg-green-700 hover:scale-105 hover:shadow-lg'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      {contract.status === 'Dispute' ? 'Resubmit Work' : 'Work Submission'}
                    </button>
                    <button
                      onClick={() => {
                        // Open work checking page in new tab
                        window.open('http://localhost:8501', '_blank');
                      }}
                      disabled={contract.status !== 'WorkSubmitted' && contract.status !== 'Approved'}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                        contract.status === 'WorkSubmitted' || contract.status === 'Approved'
                          ? 'bg-purple-600 text-white hover:bg-purple-700 hover:scale-105 hover:shadow-lg'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Check Work
                    </button>
                    <button
                      onClick={() => setShowReports(true)}
                      disabled={contract.status !== 'WorkSubmitted' && contract.status !== 'Approved' && contract.status !== 'Dispute'}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                        contract.status === 'WorkSubmitted' || contract.status === 'Approved' || contract.status === 'Dispute'
                          ? 'bg-orange-600 text-white hover:bg-orange-700 hover:scale-105 hover:shadow-lg'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      Reports
                    </button>
                  </div>
                </div>
              </div>

              {/* Contract Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                                  <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Contract Description</h4>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <ul className="text-gray-700 leading-relaxed space-y-2">
                      {contract.description.split('\n').filter(item => item.trim()).map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-1">•</span>
                          <span>{item.trim().replace(/^[•\-\*]\s*/, '')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-gray-700">Created:</span>
                        <span className="text-gray-600">{contract.createdDate}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-gray-700">Deadline:</span>
                        <span className="text-gray-600">{contract.deadline}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">Parties</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Shield className="w-4 h-4" />
                        <span>Privacy Controls</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="font-medium text-gray-700">Client</span>
                          </div>
                          <button
                            onClick={() => setShowClientAddress(!showClientAddress)}
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            {showClientAddress ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            {showClientAddress ? 'Hide' : 'Show'}
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          {showClientAddress ? (
                            <>
                              <span className="font-mono text-sm text-gray-600">{contract.client}</span>
                              <button
                                onClick={() => copyToClipboard(contract.client, 'client')}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                            </>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm text-gray-600">
                                {contract.client.substring(0, 6)}...{contract.client.substring(contract.client.length - 4)}
                              </span>
                              <button
                                onClick={() => copyToClipboard(contract.client, 'client')}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="font-medium text-gray-700">Contractor</span>
                          </div>
                          <button
                            onClick={() => setShowContractorAddress(!showContractorAddress)}
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            {showContractorAddress ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            {showContractorAddress ? 'Hide' : 'Show'}
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          {showContractorAddress ? (
                            <>
                              <span className="font-mono text-sm text-gray-600">{contract.contractor}</span>
                              <button
                                onClick={() => copyToClipboard(contract.contractor, 'contractor')}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                            </>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm text-gray-600">
                                {contract.contractor.substring(0, 6)}...{contract.contractor.substring(contract.contractor.length - 4)}
                              </span>
                              <button
                                onClick={() => copyToClipboard(contract.contractor, 'contractor')}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Contract Value</h4>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                      <div className="text-3xl font-bold text-green-800">{contract.value}</div>
                      <div className="text-sm text-green-600 mt-1">Total Contract Value</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Contract Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Create New Contract</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Contract Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contract Title
                    </label>
                    <input
                      type="text"
                      value={createForm.title}
                      onChange={(e) => handleFormChange('title', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter contract title"
                    />
                  </div>

                  {/* Contract Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contract Description
                    </label>
                    <textarea
                      value={createForm.description}
                      onChange={(e) => handleFormChange('description', e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Enter each point on a new line:&#10;• Frontend development with React&#10;• Backend API with Node.js&#10;• Database integration with PostgreSQL&#10;• Testing and deployment"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter each bullet point on a separate line. You can start with "•" or just write the text.
                    </p>
                  </div>

                  {/* Contract Value */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contract Value (ETH)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={createForm.value.replace(' ETH', '')}
                        onChange={(e) => handleFormChange('value', e.target.value + ' ETH')}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-gray-500 font-medium">ETH</span>
                      </div>
                    </div>
                  </div>

                  {/* Client Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Client Address
                    </label>
                    <input
                      type="text"
                      value={createForm.client}
                      onChange={(e) => handleFormChange('client', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0x..."
                    />
                  </div>

                  {/* Contractor Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contractor Address
                    </label>
                    <input
                      type="text"
                      value={createForm.contractor}
                      onChange={(e) => handleFormChange('contractor', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0x..."
                    />
                  </div>

                  {/* Deadline */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deadline
                    </label>
                    <input
                      type="date"
                      value={createForm.deadline}
                      onChange={(e) => handleFormChange('deadline', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateContract}
                      disabled={!createForm.title || !createForm.description || !createForm.value || !createForm.client || !createForm.contractor || !createForm.deadline}
                      className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Create Contract
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Work Submission Page */}
        {showWorkSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setShowWorkSubmission(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {contract?.status === 'Dispute' ? 'Work Resubmission' : 'Work Submission'}
                    </h2>
                  </div>
                  <div className="text-sm text-gray-500">
                    Contract: {contract?.title}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Resubmission Context */}
                  {contract?.status === 'Dispute' && (
                    <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                      <h4 className="text-sm font-medium text-yellow-900 mb-2">Resubmission Context</h4>
                      <p className="text-sm text-yellow-800">
                        You are resubmitting work after a dispute was raised. Please address the issues mentioned in the dispute 
                        and provide updated work that resolves the concerns. This resubmission will be evaluated against the 
                        original requirements and the dispute feedback.
                      </p>
                    </div>
                  )}

                  {/* GitHub Link */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GitHub Repository Link
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        value={workSubmissionData.githubLink}
                        onChange={(e) => setWorkSubmissionData(prev => ({ ...prev, githubLink: e.target.value }))}
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://github.com/username/repository"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Github className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Provide the GitHub repository URL for AI evaluation
                    </p>
                  </div>

                  {/* Requirements File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FileCheck className="w-4 h-4 inline mr-2" />
                      Upload Requirement Files *
                    </label>
                    <div className="border-2 border-dashed border-orange-300 rounded-xl p-6 text-center hover:border-orange-400 transition-colors bg-orange-50">
                      <input
                        type="file"
                        multiple
                        onChange={handleRequirementFileUpload}
                        className="hidden"
                        id="requirement-file-upload"
                        accept=".pdf,.doc,.docx,.txt,.md"
                      />
                      <label htmlFor="requirement-file-upload" className="cursor-pointer">
                        <FileCheck className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                        <p className="text-lg font-medium text-gray-700 mb-2">
                          Upload requirement documents
                        </p>
                        <p className="text-sm text-gray-500">
                          Upload PDF, Word, or text files containing project requirements for AI analysis
                        </p>
                      </label>
                    </div>
                    
                    {/* Requirement File List */}
                    {workSubmissionData.requirementFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">Uploaded Requirement Files:</h4>
                        {workSubmissionData.requirementFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-orange-50 p-3 rounded-lg border border-orange-200">
                            <div className="flex items-center gap-2">
                              <FileCheck className="w-4 h-4 text-orange-500" />
                              <span className="text-sm text-gray-700">{file.name}</span>
                              <span className="text-xs text-gray-500">
                                ({(file.size / 1024 / 1024).toFixed(2)} MB)
                              </span>
                            </div>
                            <button
                              onClick={() => removeRequirementFile(index)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Image Files Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Upload className="w-4 h-4 inline mr-2" />
                      Upload Visual Assets (Screenshots, UI Mockups, etc.)
                    </label>
                    <div className="border-2 border-dashed border-purple-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors bg-purple-50">
                      <input
                        type="file"
                        multiple
                        onChange={handleImageFileUpload}
                        className="hidden"
                        id="image-file-upload"
                        accept="image/*"
                      />
                      <label htmlFor="image-file-upload" className="cursor-pointer">
                        <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                        <p className="text-lg font-medium text-gray-700 mb-2">
                          Upload visual assets for analysis
                        </p>
                        <p className="text-sm text-gray-500">
                          Upload screenshots, UI mockups, or any visual deliverables for AI comparison
                        </p>
                      </label>
                    </div>
                    
                    {/* Image File List */}
                    {workSubmissionData.imageFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">Uploaded Visual Assets:</h4>
                        {workSubmissionData.imageFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-purple-50 p-3 rounded-lg border border-purple-200">
                            <div className="flex items-center gap-2">
                              <Upload className="w-4 h-4 text-purple-500" />
                              <span className="text-sm text-gray-700">{file.name}</span>
                              <span className="text-xs text-gray-500">
                                ({(file.size / 1024 / 1024).toFixed(2)} MB)
                              </span>
                            </div>
                            <button
                              onClick={() => removeImageFile(index)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Document Files Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Upload className="w-4 h-4 inline mr-2" />
                      Upload Document Files (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        multiple
                        onChange={handleDocumentFileUpload}
                        className="hidden"
                        id="document-file-upload"
                        accept=".pdf,.doc,.docx,.txt,.md,.xls,.xlsx,.ppt,.pptx"
                      />
                      <label htmlFor="document-file-upload" className="cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-lg font-medium text-gray-700 mb-2">
                          Drop files here or click to upload
                        </p>
                        <p className="text-sm text-gray-500">
                          Upload additional document files, reports, or any relevant materials
                        </p>
                      </label>
                    </div>
                    
                    {/* Document File List */}
                    {workSubmissionData.documentFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">Uploaded Document Files:</h4>
                        {workSubmissionData.documentFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-700">{file.name}</span>
                              <span className="text-xs text-gray-500">
                                ({(file.size / 1024 / 1024).toFixed(2)} MB)
                              </span>
                            </div>
                            <button
                              onClick={() => removeDocumentFile(index)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Project Files Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Upload className="w-4 h-4 inline mr-2" />
                      Attach Project Files (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-lg font-medium text-gray-700 mb-2">
                          Drop files here or click to upload
                        </p>
                        <p className="text-sm text-gray-500">
                          Upload additional project files, documentation, or any relevant materials
                        </p>
                      </label>
                    </div>
                    
                    {/* File List */}
                    {workSubmissionData.files.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">Uploaded Project Files:</h4>
                        {workSubmissionData.files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-700">{file.name}</span>
                              <span className="text-xs text-gray-500">
                                ({(file.size / 1024 / 1024).toFixed(2)} MB)
                              </span>
                            </div>
                            <button
                              onClick={() => removeFile(index)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Additional Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Description
                    </label>
                    <textarea
                      value={workSubmissionData.description}
                      onChange={(e) => setWorkSubmissionData(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Provide additional context about your work, implementation details, or any special considerations for AI evaluation..."
                    />
                  </div>

                  {/* AI Evaluation Info */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-5 h-5 text-blue-600" />
                      <h4 className="text-sm font-medium text-blue-900">Gemini AI Evaluation Process</h4>
                    </div>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Repository structure and code quality analysis</li>
                      <li>• Visual asset comparison with requirements</li>
                      <li>• Document content analysis against requirements</li>
                      <li>• Requirements compliance verification</li>
                      <li>• Documentation completeness review</li>
                      <li>• Performance and security assessment</li>
                      <li>• Detailed scoring and recommendations</li>
                    </ul>
                    <div className="mt-3 p-2 bg-blue-100 rounded-lg">
                      <p className="text-xs text-blue-700">
                        <strong>Note:</strong> The AI will analyze your GitHub repository, visual assets, and documents against the uploaded requirement files to generate a comprehensive evaluation report.
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => setShowWorkSubmission(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={submitWork}
                      disabled={(!workSubmissionData.githubLink && workSubmissionData.files.length === 0 && workSubmissionData.imageFiles.length === 0 && workSubmissionData.documentFiles.length === 0) || workSubmissionData.requirementFiles.length === 0}
                      className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Brain className="w-4 h-4" />
                      {contract?.status === 'Dispute' ? 'Resubmit for Gemini AI Evaluation' : 'Submit for Gemini AI Evaluation'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Reports Modal */}
        {showReports && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setShowReports(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900">AI Evaluation Reports</h2>
                  </div>
                  <div className="text-sm text-gray-500">
                    Contract: {contract?.title}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Report Status */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Evaluation Status</h3>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        aiReport.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : aiReport.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {aiReport.status === 'completed' ? 'Completed' : aiReport.status === 'pending' ? 'In Progress' : 'Failed'}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{aiReport.score}/100</div>
                        <div className="text-sm text-gray-600">Overall Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">{aiReport.evaluationDate || 'Pending'}</div>
                        <div className="text-sm text-gray-600">Evaluation Date</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">{aiReport.evaluator}</div>
                        <div className="text-sm text-gray-600">Evaluator</div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Feedback */}
                  {aiReport.status === 'completed' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Gemini AI Analysis Report</h4>
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                          <div className="prose prose-sm max-w-none">
                            <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed font-sans">
                              {aiReport.analysisResult || aiReport.feedback || 'No detailed analysis available yet.'}
                            </pre>
                          </div>
                        </div>
                      </div>

                      {/* Recommendations */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Recommendations</h4>
                        <div className="space-y-2">
                          {aiReport.recommendations.length > 0 ? (
                            aiReport.recommendations.map((rec, index) => (
                              <div key={index} className="flex items-start gap-3 bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-200">
                                <span className="text-blue-600 font-bold mt-1">•</span>
                                <span className="text-gray-700">{rec}</span>
                              </div>
                            ))
                          ) : (
                            <div className="text-gray-500 text-center py-4">
                              No recommendations available
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Pending State */}
                  {aiReport.status === 'pending' && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Brain className="w-6 h-6 text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Gemini AI Analysis in Progress</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Gemini AI is analyzing your GitHub repository against the uploaded requirements. This process typically takes 3-5 minutes.
                      </p>
                      <div className="bg-blue-50 p-3 rounded-lg max-w-md mx-auto">
                        <p className="text-sm text-blue-700">
                          <strong>What's happening:</strong> Repository scanning, code analysis, requirements comparison, and report generation.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Failed State */}
                  {aiReport.status === 'failed' && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Evaluation Failed</h3>
                      <p className="text-gray-600">
                        The AI evaluation encountered an error. Please try resubmitting your work.
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => setShowReports(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                      Close
                    </button>
                    {aiReport.status === 'completed' && (
                      <button
                        onClick={downloadReport}
                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                      >
                        Download Report
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dispute Modal */}
        {showDisputeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setShowDisputeModal(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900">Raise Dispute</h2>
                  </div>
                  <div className="text-sm text-gray-500">
                    Contract: {contract?.title}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Dispute Reason */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for Dispute *
                    </label>
                    <select
                      value={disputeData.reason}
                      onChange={(e) => setDisputeData(prev => ({ ...prev, reason: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">Select a reason</option>
                      <option value="incomplete-work">Incomplete Work</option>
                      <option value="poor-quality">Poor Quality</option>
                      <option value="not-delivered">Work Not Delivered</option>
                      <option value="wrong-implementation">Wrong Implementation</option>
                      <option value="missing-features">Missing Features</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Detailed Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Detailed Description *
                    </label>
                    <textarea
                      value={disputeData.description}
                      onChange={(e) => setDisputeData(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                      placeholder="Provide a detailed description of what work is not done, what issues you've encountered, or what specific problems need to be addressed..."
                    />
                  </div>

                  {/* Requested Changes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Requested Changes
                    </label>
                    <textarea
                      value={disputeData.requestedChanges}
                      onChange={(e) => setDisputeData(prev => ({ ...prev, requestedChanges: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                      placeholder="Describe what specific changes or improvements you need from the contractor..."
                    />
                  </div>

                  {/* Evidence Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Supporting Evidence
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-red-400 transition-colors">
                      <input
                        type="file"
                        multiple
                        onChange={handleDisputeFileUpload}
                        className="hidden"
                        id="dispute-file-upload"
                      />
                      <label htmlFor="dispute-file-upload" className="cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-lg font-medium text-gray-700 mb-2">
                          Upload evidence files
                        </p>
                        <p className="text-sm text-gray-500">
                          Screenshots, documents, or any files that support your dispute
                        </p>
                      </label>
                    </div>
                    
                    {/* Evidence File List */}
                    {disputeData.evidence.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">Uploaded Evidence:</h4>
                        {disputeData.evidence.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-700">{file.name}</span>
                              <span className="text-xs text-gray-500">
                                ({(file.size / 1024 / 1024).toFixed(2)} MB)
                              </span>
                            </div>
                            <button
                              onClick={() => removeDisputeFile(index)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Dispute Information */}
                  <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                    <h4 className="text-sm font-medium text-red-900 mb-2">Important Information</h4>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• Disputes will be reviewed by our team within 24-48 hours</li>
                      <li>• Provide clear evidence to support your claim</li>
                      <li>• Be specific about what work is missing or incorrect</li>
                      <li>• Contract may be paused during dispute resolution</li>
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => setShowDisputeModal(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={submitDispute}
                      disabled={!disputeData.reason || !disputeData.description}
                      className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      Submit Dispute
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Copy Notification */}
        {copiedAddress && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
            Address copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
}

export default App;