#!/usr/bin/env python3
"""
Test script for the AI Governance Tool backend
This script tests the Flask backend without requiring pip installation
"""

import json
import sys
import traceback

# Try to import required modules
try:
    import requests
    HAS_REQUESTS = True
except ImportError:
    HAS_REQUESTS = False
    print("⚠️  requests module not available, using urllib instead")

try:
    from flask import Flask
    HAS_FLASK = True
except ImportError:
    HAS_FLASK = False
    print("❌ Flask not available - need to install: pip install flask flask-cors requests")

def test_with_requests():
    """Test backend using requests library"""
    try:
        # Test health endpoint
        response = requests.get('http://localhost:5000/health', timeout=5)
        print(f"✅ Health check: {response.status_code} - {response.json()}")
        
        # Test LLM endpoint
        test_data = {
            "prompt": "What is artificial intelligence?",
            "model": "mistralai/Mistral-7B-Instruct-v0.3",
            "max_tokens": 50,
            "temperature": 0.7
        }
        
        response = requests.post('http://localhost:5000/llm', 
                               json=test_data, 
                               timeout=30)
        
        print(f"✅ LLM endpoint: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"   Response keys: {list(result.keys())}")
        else:
            print(f"   Error: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to backend - make sure it's running on localhost:5000")
    except Exception as e:
        print(f"❌ Test failed: {e}")

def test_with_urllib():
    """Test backend using urllib (built-in)"""
    import urllib.request
    import urllib.parse
    
    try:
        # Test health endpoint
        response = urllib.request.urlopen('http://localhost:5000/health', timeout=5)
        health_data = json.loads(response.read().decode('utf-8'))
        print(f"✅ Health check: {response.getcode()} - {health_data}")
        
        # Test LLM endpoint  
        test_data = {
            "prompt": "What is artificial intelligence?",
            "model": "mistralai/Mistral-7B-Instruct-v0.3",
            "max_tokens": 50,
            "temperature": 0.7
        }
        
        data = json.dumps(test_data).encode('utf-8')
        req = urllib.request.Request('http://localhost:5000/llm',
                                   data=data,
                                   headers={'Content-Type': 'application/json'})
        
        response = urllib.request.urlopen(req, timeout=30)
        result = json.loads(response.read().decode('utf-8'))
        
        print(f"✅ LLM endpoint: {response.getcode()}")
        print(f"   Response keys: {list(result.keys())}")
        
    except urllib.error.URLError as e:
        print(f"❌ Cannot connect to backend: {e}")
    except Exception as e:
        print(f"❌ Test failed: {e}")

if __name__ == "__main__":
    print("🧪 Testing AI Governance Tool Backend")
    print("=" * 50)
    
    if not HAS_FLASK:
        print("❌ Flask not installed. Backend cannot run.")
        print("   Install with: pip install flask flask-cors requests")
        sys.exit(1)
    
    print("📋 Backend requirements check:")
    print(f"   Flask: {'✅' if HAS_FLASK else '❌'}")
    print(f"   Requests: {'✅' if HAS_REQUESTS else '⚠️ '}")
    print()
    
    if HAS_REQUESTS:
        print("🔍 Testing with requests library...")
        test_with_requests()
    else:
        print("🔍 Testing with urllib (built-in)...")
        test_with_urllib()
    
    print("\n📝 Notes:")
    print("   - Make sure backend is running: python app.py")
    print("   - Backend should be at: http://localhost:5000")
    print("   - HuggingFace token should be set in app.py")