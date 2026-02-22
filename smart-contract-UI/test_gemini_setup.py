#!/usr/bin/env python3
"""
Test script to verify Gemini AI setup
Run this script to check if your Gemini AI configuration is working correctly.
"""

import os
import sys
from dotenv import load_dotenv

def test_gemini_setup():
    """Test if Gemini AI is properly configured"""
    print("🔍 Testing Gemini AI Setup")
    print("=" * 50)
    
    # Load environment variables
    load_dotenv()
    
    # Check for API key
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("❌ GEMINI_API_KEY not found in environment variables")
        print("\nTo fix this:")
        print("1. Get an API key from: https://makersuite.google.com/app/apikey")
        print("2. Set the environment variable:")
        print("   Windows (PowerShell): $env:GEMINI_API_KEY='your-api-key'")
        print("   Windows (CMD): set GEMINI_API_KEY=your-api-key")
        print("   macOS/Linux: export GEMINI_API_KEY='your-api-key'")
        return False
    
    print("✅ GEMINI_API_KEY found in environment variables")
    
    # Test import
    try:
        import google.generativeai as genai
        print("✅ google.generativeai library imported successfully")
    except ImportError as e:
        print(f"❌ Failed to import google.generativeai: {e}")
        print("\nTo fix this, install the library:")
        print("pip install google-generativeai")
        return False
    
    # Test configuration
    try:
        genai.configure(api_key=api_key)
        print("✅ Gemini AI configured successfully")
    except Exception as e:
        print(f"❌ Failed to configure Gemini AI: {e}")
        return False
    
    # Test model creation
    try:
        model = genai.GenerativeModel('gemini-2.5-pro')
        print("✅ Gemini model created successfully")
    except Exception as e:
        print(f"❌ Failed to create Gemini model: {e}")
        return False
    
    # Test simple generation
    try:
        print("\n🧪 Testing AI generation...")
        response = model.generate_content("Hello! Please respond with 'Gemini AI is working correctly!'")
        print(f"✅ AI Response: {response.text}")
        print("\n🎉 Gemini AI is working correctly!")
        return True
    except Exception as e:
        print(f"❌ Failed to generate content: {e}")
        return False

def main():
    """Main function"""
    print("🚀 Gemini AI Setup Test")
    print("=" * 50)
    
    success = test_gemini_setup()
    
    if success:
        print("\n" + "=" * 50)
        print("✅ Setup is working correctly!")
        print("You can now run the backend and get real AI analysis reports.")
        print("\nNext steps:")
        print("1. Start the backend: cd backend && python gemini_analyzer.py")
        print("2. Start the frontend: npm run dev")
        print("3. Test the analysis with a GitHub repository")
    else:
        print("\n" + "=" * 50)
        print("❌ Setup needs to be fixed")
        print("Please follow the instructions above to configure Gemini AI.")
        print("\nFor detailed instructions, see: SETUP_GEMINI.md")
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main()) 