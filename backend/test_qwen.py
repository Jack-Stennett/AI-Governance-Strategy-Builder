import urllib.request
import json

# Simple test with Qwen model
test_data = {
    "prompt": "What is AI governance?",
    "model": "Qwen/Qwen2.5-7B-Instruct",
    "max_tokens": 100,
    "temperature": 0.7
}

data = json.dumps(test_data).encode('utf-8')
req = urllib.request.Request('http://localhost:5001/llm',
                           data=data,
                           headers={'Content-Type': 'application/json'})

try:
    response = urllib.request.urlopen(req, timeout=30)
    result = json.loads(response.read().decode('utf-8'))
    print('SUCCESS!')
    print('Status:', response.getcode())
    if 'choices' in result:
        print('Response:', result['choices'][0]['message']['content'][:200])
    else:
        print('Full response:', result)
except Exception as e:
    print('FAILED:', e)