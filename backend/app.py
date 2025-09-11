from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend integration

# Your Hugging Face API token - load from environment variable or config file
HF_TOKEN = os.getenv("HF_TOKEN")

# Fallback to local config file if no environment variable
if not HF_TOKEN:
    try:
        from config import HF_TOKEN
        print(">> Using token from config.py")
    except ImportError:
        HF_TOKEN = "your-token-here"
        print(">> WARNING: No HF_TOKEN found. Create backend/config.py or set HF_TOKEN environment variable.")

@app.route("/llm", methods=["POST"])
def llm():
    try:
        print(">> Received LLM request")
        data = request.get_json()
        print(f">> Request data keys: {list(data.keys()) if data else 'None'}")
        
        prompt = data.get("prompt", "")
        model = data.get("model", "Qwen/Qwen2.5-7B-Instruct")
        max_tokens = data.get("max_tokens", 120)
        temperature = data.get("temperature", 0.7)
        
        print(f">> Parameters: model={model}, max_tokens={max_tokens}, temp={temperature}")
        print(f">> Prompt length: {len(prompt)} chars")

        # Real HuggingFace API call using working model
        url = "https://router.huggingface.co/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {HF_TOKEN}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": model,
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": max_tokens,
            "temperature": temperature
        }
        
        print(f">> Making request to: {url}")
        print(f">> Model: {model}")

        response = requests.post(url, headers=headers, json=payload, timeout=30)
        
        print(f">> Response status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f">> Success! Response keys: {list(result.keys())}")
            return jsonify(result)
        else:
            error_text = response.text
            print(f">> API Error: {response.status_code}")
            print(f">> Error details: {error_text}")
            return jsonify({
                "error": f"API request failed with status {response.status_code}",
                "details": error_text
            }), response.status_code
            
    except Exception as e:
        print(f">> Backend Exception: {str(e)}")
        import traceback
        print(f">> Traceback: {traceback.format_exc()}")
        return jsonify({
            "error": "Backend processing error",
            "details": str(e)
        }), 500

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy", "service": "AI Governance Tool Backend"})

if __name__ == "__main__":
    print("Starting AI Governance Tool Backend...")
    print("Backend will run on http://localhost:5001")
    app.run(host="127.0.0.1", port=5001, debug=True)