import requests
import json

# Test HuggingFace token permissions
HF_TOKEN = "your-huggingface-token-here"

# Test 1: Check token validity with whoami endpoint
print("=== Testing HuggingFace Token ===")
whoami_url = "https://huggingface.co/api/whoami"
headers = {"Authorization": f"Bearer {HF_TOKEN}"}

try:
    response = requests.get(whoami_url, headers=headers)
    print(f"Token validation: {response.status_code}")
    if response.status_code == 200:
        user_info = response.json()
        print(f"✅ Token valid for user: {user_info.get('name', 'Unknown')}")
        print(f"   Account type: {user_info.get('type', 'Unknown')}")
    else:
        print(f"❌ Token invalid: {response.text}")
        exit(1)
except Exception as e:
    print(f"❌ Token test failed: {e}")
    exit(1)

# Test 2: Try a very simple, guaranteed-to-work model
print("\n=== Testing Simple Model ===")
simple_url = "https://api-inference.huggingface.co/models/gpt2"
payload = {
    "inputs": "The benefits of AI governance include",
    "parameters": {
        "max_new_tokens": 50,
        "temperature": 0.7,
        "return_full_text": False
    }
}

try:
    response = requests.post(simple_url, headers=headers, json=payload, timeout=30)
    print(f"GPT-2 test: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print("✅ GPT-2 works!")
        if isinstance(result, list) and len(result) > 0:
            text = result[0].get('generated_text', 'No text generated')
            print(f"   Generated: {text[:100]}...")
        else:
            print(f"   Response: {result}")
    elif response.status_code == 503:
        print("⏳ Model is loading, this is normal")
        print(f"   Response: {response.text}")
    else:
        print(f"❌ GPT-2 failed: {response.status_code}")
        print(f"   Response: {response.text}")
        
except Exception as e:
    print(f"❌ GPT-2 test failed: {e}")

# Test 3: Check what models are available to you
print("\n=== Checking Available Models ===")
try:
    # Try a few different known models
    test_models = [
        "google/flan-t5-small",
        "microsoft/DialoGPT-small",
        "facebook/blenderbot-400M-distill",
    ]
    
    for model in test_models:
        test_url = f"https://api-inference.huggingface.co/models/{model}"
        test_payload = {"inputs": "Hello"}
        
        response = requests.post(test_url, headers=headers, json=test_payload, timeout=10)
        status = "✅ Available" if response.status_code in [200, 503] else f"❌ {response.status_code}"
        print(f"   {model}: {status}")
        
except Exception as e:
    print(f"❌ Model availability test failed: {e}")

print("\n=== Summary ===")
print("If token is valid and GPT-2 works, we can proceed with a working model!")