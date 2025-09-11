import urllib.request
import json

# Test SmolLM3 model via backend
test_data = {
    "prompt": "What are the key principles of AI governance?",
    "model": "HuggingFaceTB/SmolLM3-3B",
    "max_tokens": 150,
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
        content = result['choices'][0]['message']['content']
        print('AI Response:', content)
    else:
        print('Full response:', result)
except Exception as e:
    print('FAILED:', e)