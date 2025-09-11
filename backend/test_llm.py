import urllib.request
import json

# Test LLM endpoint
test_data = {
    "prompt": "What is artificial intelligence?",
    "model": "mistralai/Mistral-7B-Instruct-v0.3",
    "max_tokens": 50,
    "temperature": 0.7
}

data = json.dumps(test_data).encode('utf-8')
req = urllib.request.Request('http://localhost:5001/llm',
                           data=data,
                           headers={'Content-Type': 'application/json'})

try:
    response = urllib.request.urlopen(req, timeout=30)
    result = json.loads(response.read().decode('utf-8'))
    print('LLM test successful!')
    print('Status code:', response.getcode())
    print('Response keys:', list(result.keys()))
    if 'choices' in result and result['choices']:
        content = result['choices'][0]['message']['content']
        print('Generated content:', content[:200] + '...' if len(content) > 200 else content)
    else:
        print('Full response:', result)
except Exception as e:
    print('LLM test failed:', e)