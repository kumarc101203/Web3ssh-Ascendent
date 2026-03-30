
import sys
import os

# Add the local directory to the path so we can import gemini_analyzer
sys.path.append('.')

from gemini_analyzer import GitHubScouter

def test_scouter():
    test_url = "https://github.com/kumarc101203/Portfolio"
    print(f"Testing Scouter with: {test_url}")
    
    data = GitHubScouter.fetch_repo_data(test_url)
    
    if "error" in data:
        print(f"❌ Error: {data['error']}")
        return
        
    print(f"✅ Success! Found {len(data['structure'])} files.")
    print(f"Key files found: {list(data['contents'].keys())}")
    
    # Check specifically for achievements/experience in the contents
    for path, content in data['contents'].items():
        if "achievements" in content.lower() or "award" in content.lower():
            print(f"✨ Found 'Achievements' related text in {path}!")
            return
            
    print("⚠️ No direct 'achievements' text found in the first 3k chars of key files, but AI will still have the full file list.")

if __name__ == "__main__":
    test_scouter()
