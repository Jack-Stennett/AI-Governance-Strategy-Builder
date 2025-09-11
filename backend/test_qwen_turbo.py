import requests
import json

# Test Qwen2.5-7B-Instruct-Turbo model via backend
URL = "http://127.0.0.1:5001/llm"   # Correct port
payload = {
    "prompt": "What are the key principles of AI governance? Provide a structured analysis.",
    "model": "Qwen/Qwen2.5-7B-Instruct",
    "max_tokens": 200,
    "temperature": 0.7
}

try:
    r = requests.post(URL, headers={"Content-Type": "application/json"}, json=payload, timeout=30)
    print('Status code:', r.status_code)
    print('Response text:')
    print(r.text)
    
    if r.status_code == 200:
        result = r.json()
        if 'choices' in result:
            content = result['choices'][0]['message']['content']
            print('\nQwen Turbo Response:')
            print('-' * 50)
            print(content)
            print('-' * 50)
        else:
            print('Full response:', result)
    else:
        print('ERROR - Backend returned:', r.status_code)
        
except Exception as e:
    print('FAILED:', e)