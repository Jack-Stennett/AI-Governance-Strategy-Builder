import requests
import json

# Test HuggingFace API directly
HF_TOKEN = "your-huggingface-token-here"

url = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium"
headers = {
    "Authorization": f"Bearer {HF_TOKEN}",
    "Content-Type": "application/json"
}
payload = {
    "inputs": "What is AI governance?",
    "parameters": {
        "max_new_tokens": 100,
        "temperature": 0.7,
        "return_full_text": False
    }
}

print("Testing HuggingFace API directly...")
print(f"URL: {url}")
print(f"Using Inference API format")

try:
    response = requests.post(url, headers=headers, json=payload, timeout=30)
    print(f"Status: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print("SUCCESS!")
        print("Response keys:", list(result.keys()))
        if isinstance(result, list) and len(result) > 0:
            content = result[0].get('generated_text', str(result[0]))
            print(f"Content: {content[:200]}...")
        else:
            print(f"Full result: {result}")
    else:
        print("ERROR:")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
        
except Exception as e:
    print(f"Exception: {e}")