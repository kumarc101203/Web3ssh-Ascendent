# Smart Contract Management with Gemini AI Analysis

A comprehensive smart contract management system with integrated Gemini AI analysis for work evaluation. This project combines a React frontend with a Python FastAPI backend to provide intelligent repository analysis against requirement documents.

## Features

### Frontend (React + TypeScript)
- **Smart Contract Management**: Create, monitor, and manage smart contracts
- **Work Submission Interface**: Submit GitHub repositories, requirement files, and visual assets
- **AI-Powered Analysis**: Integrated Gemini AI evaluation system for both code and images
- **Visual Asset Analysis**: Compare screenshots and UI mockups against requirements
- **Real-time Reports**: Detailed analysis reports with scoring and recommendations
- **Dispute Management**: Raise and manage contract disputes
- **Modern UI**: Beautiful, responsive interface with Tailwind CSS

### Backend (Python FastAPI)
- **Gemini AI Integration**: Real-time repository and image analysis using Google's Gemini 2.5 Pro
- **Multi-Modal Analysis**: Support for both code repositories and visual assets
- **File Processing**: Handle requirement documents (PDF, Word, text files) and images
- **RESTful API**: Clean API endpoints for frontend integration
- **CORS Support**: Cross-origin resource sharing for development
- **Error Handling**: Robust error handling and fallback mechanisms

## Project Structure

```
├── src/                    # React frontend
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # React entry point
│   └── index.css          # Global styles
├── backend/               # Python backend
│   ├── gemini_analyzer.py # FastAPI server with Gemini integration
│   └── requirements.txt   # Python dependencies
├── package.json           # Frontend dependencies
└── README.md             # This file
```

## Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- Google Cloud Project with Gemini AI enabled
- Google Cloud credentials (optional, for real AI analysis)

## Installation

### 1. Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables (optional)
cp .env.example .env
# Edit .env with your Google Cloud credentials

# Start the backend server
python gemini_analyzer.py
```

The backend will be available at `http://localhost:8000`

### 3. Environment Variables (Optional)

Create a `.env` file in the backend directory:

```env
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=path/to/your/credentials.json
```

## Usage

### 1. Create a Contract
1. Click "Create Contract" button
2. Fill in contract details (title, description, value, parties, deadline)
3. Submit to create the contract

### 2. Submit Work for AI Analysis
1. Navigate to the contract and click "Work Submission"
2. Provide GitHub repository URL (optional if submitting images)
3. Upload requirement files (PDF, Word, or text documents)
4. Upload visual assets (screenshots, UI mockups, etc.)
5. Add optional project files and description
6. Click "Submit for Gemini AI Evaluation"

### 3. View AI Analysis Report
1. Click "Reports" button after work submission
2. View detailed analysis including:
   - Overall compliance score
   - Detailed feedback
   - Key recommendations
   - Compliance breakdown by category

### 4. Manage Disputes
1. Click "Dispute" button if issues arise
2. Select dispute reason and provide detailed description
3. Upload supporting evidence
4. Submit for review

## API Endpoints

### Backend API (FastAPI)

- `POST /analyze` - Analyze repository against requirements
- `GET /health` - Health check endpoint

### Request Format for Analysis

```javascript
const formData = new FormData();
formData.append('repo_url', 'https://github.com/user/repo');
formData.append('description', 'Project description');
formData.append('requirement_files', file1);
formData.append('requirement_files', file2);
formData.append('image_files', image1);
formData.append('image_files', image2);
```

### Response Format

```json
{
  "status": "completed",
  "score": 85,
  "feedback": "Detailed analysis...",
  "recommendations": ["Recommendation 1", "Recommendation 2"],
  "evaluation_date": "2024-01-15",
  "evaluator": "Gemini AI Evaluation System",
  "analysis_result": "Full analysis report..."
}
```

## AI Analysis Features

### What Gemini AI Analyzes
- **Repository Structure**: Code organization and architecture
- **Code Quality**: Best practices, patterns, and standards
- **Visual Assets**: UI/UX design, layout, and visual compliance
- **Requirements Compliance**: Feature implementation against requirements
- **Documentation**: Completeness and quality of documentation
- **Testing**: Test coverage and quality
- **Security**: Security best practices and vulnerabilities

### Analysis Output
- **Overall Score**: 0-100 compliance score
- **Detailed Feedback**: Comprehensive analysis report
- **Recommendations**: Actionable improvement suggestions
- **Compliance Breakdown**: Category-wise scoring

## Development

### Frontend Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd backend
python gemini_analyzer.py  # Start development server
```

### Testing the AI Integration
1. Start both frontend and backend servers
2. Create a contract
3. Submit work with a GitHub URL and requirement files
4. Check the analysis report in the Reports section

## Troubleshooting

### Common Issues

1. **Backend Connection Error**
   - Ensure backend is running on port 8000
   - Check CORS settings in backend
   - Verify network connectivity

2. **Gemini AI Not Working**
   - Check Google Cloud credentials
   - Verify project ID and permissions
   - Check API quotas and limits

3. **File Upload Issues**
   - Ensure file size is within limits
   - Check file format compatibility
   - Verify file permissions

### Mock Mode
If Gemini AI credentials are not configured, the system will run in mock mode, providing sample analysis results for testing purposes.
