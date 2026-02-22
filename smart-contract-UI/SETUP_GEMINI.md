# Gemini AI Setup Guide

## Why You're Getting Static Reports

You're currently getting static/mock reports because the Gemini AI client is not properly configured. The system falls back to mock analysis when it can't connect to the real AI service.

## How to Enable Real AI Analysis

### Option 1: Using Gemini API Key (Recommended)

1. **Get a Gemini API Key:**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the generated API key

2. **Set the Environment Variable:**
   
   **On Windows (PowerShell):**
   ```powershell
   $env:GEMINI_API_KEY="your-api-key-here"
   ```
   
   **On Windows (Command Prompt):**
   ```cmd
   set GEMINI_API_KEY=your-api-key-here
   ```
   
   **On macOS/Linux:**
   ```bash
   export GEMINI_API_KEY="your-api-key-here"
   ```

3. **Create a .env file (Alternative):**
   Create a file named `.env` in the `backend` folder with:
   ```
   GEMINI_API_KEY=your-api-key-here
   ```

### Option 2: Using Google Cloud Project

1. **Set up Google Cloud Project:**
   - Create a project in [Google Cloud Console](https://console.cloud.google.com/)
   - Enable the Gemini API
   - Create a service account and download the JSON key file

2. **Set Environment Variables:**
   ```bash
   export GOOGLE_CLOUD_PROJECT="your-project-id"
   export GOOGLE_APPLICATION_CREDENTIALS="path/to/service-account-key.json"
   ```

## Testing the Setup

1. **Start the Backend:**
   ```bash
   cd "ui between main page and trasaction page/backend"
   python gemini_analyzer.py
   ```

2. **Check the Console Output:**
   - If successful: `✅ Gemini AI initialized with API Key`
   - If failed: `❌ Gemini AI client could not be initialized. Running in mock mode.`

3. **Test the Analysis:**
   - Start the frontend: `npm run dev`
   - Upload a GitHub repository URL
   - Upload requirement files
   - Submit for analysis
   - You should now get real AI-generated reports instead of static ones

## Troubleshooting

### Common Issues:

1. **"API Key Invalid" Error:**
   - Make sure you copied the entire API key
   - Check that the API key is active in Google AI Studio

2. **"Quota Exceeded" Error:**
   - Check your usage in Google AI Studio
   - Consider upgrading your plan if needed

3. **"Network Error" Error:**
   - Check your internet connection
   - Ensure no firewall is blocking the request

4. **Environment Variable Not Found:**
   - Make sure you set the environment variable in the same terminal where you run the backend
   - Try restarting your terminal/IDE

### Verification Steps:

1. **Check Environment Variable:**
   ```bash
   echo $GEMINI_API_KEY  # Should show your API key
   ```

2. **Test API Key:**
   ```python
   import google.generativeai as genai
   genai.configure(api_key="your-api-key")
   model = genai.GenerativeModel('gemini-2.5-pro')
   response = model.generate_content("Hello, test!")
   print(response.text)
   ```

## What You'll Get with Real AI Analysis

Instead of static reports, you'll get:

- **Dynamic Analysis:** Real-time analysis of your code and requirements
- **Detailed Feedback:** Specific insights about your implementation
- **Accurate Scoring:** Real assessment of requirements compliance
- **Actionable Recommendations:** Specific suggestions for improvement
- **Comprehensive Reports:** Detailed breakdown of strengths and weaknesses

## Support

If you continue to have issues:
1. Check the console output for specific error messages
2. Verify your API key is correct and active
3. Ensure you have sufficient quota/credits
4. Try the troubleshooting steps above

---

**Note:** The mock analysis is provided for testing purposes when the real AI service is not available. For production use, always configure the real Gemini AI service. 