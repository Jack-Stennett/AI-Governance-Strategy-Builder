# AI Governance Tool - Backend Setup Guide

## Quick Start

### 1. Install Dependencies
Open Command Prompt or PowerShell and run:
```bash
pip install flask flask-cors requests
```

### 2. Start Backend Server
```bash
cd backend
python app.py
```

The backend will start on: http://localhost:5000

### 3. Test Backend
Open a new terminal and run:
```bash
python test_backend.py
```

## Files Created

### `backend/app.py`
- Flask server with HuggingFace integration
- Your API key: `your-huggingface-token-here`
- Endpoints: `/llm` (POST), `/health` (GET)
- CORS enabled for frontend integration

### `backend/requirements.txt`
- Dependencies: flask, flask-cors, requests

### `backend/test_backend.py`
- Test script to verify backend functionality
- Tests both health endpoint and LLM endpoint

## Integration Changes Made

### Frontend Changes (`src/app.js`)
- Updated `callHuggingFaceAPI()` function
- Now calls `http://localhost:5000/llm` instead of direct HF API
- Handles OpenAI-style response format from backend
- Maintains error handling and logging

## How It Works

1. **Frontend** → Sends request to `http://localhost:5000/llm`
2. **Backend** → Receives request, forwards to HuggingFace API
3. **HuggingFace** → Processes request, returns response  
4. **Backend** → Returns formatted response to frontend
5. **Frontend** → Displays AI-enhanced analysis

## API Format

### Request to Backend:
```json
{
  "prompt": "Your prompt here",
  "model": "mistralai/Mistral-7B-Instruct-v0.3", 
  "max_tokens": 400,
  "temperature": 0.7
}
```

### Response from Backend:
```json
{
  "choices": [
    {
      "message": {
        "content": "AI generated response"
      }
    }
  ]
}
```

## Testing Steps

1. Start backend: `python backend/app.py`
2. Verify health: Visit `http://localhost:5000/health`
3. Test LLM: `python backend/test_backend.py`
4. Open frontend: `index.html` 
5. Enable AI features and test governance tool

## Troubleshooting

### Backend won't start:
- Check if Flask is installed: `python -c "import flask"`
- Install missing modules: `pip install flask flask-cors requests`

### Frontend can't connect:
- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify endpoint URL in browser dev tools

### API errors:
- Check HuggingFace API key is valid
- Monitor backend console logs
- Test with `curl`: 
  ```bash
  curl -X POST http://localhost:5000/health
  ```

## Security Note

The API key is embedded in `backend/app.py` for development. For production:
- Use environment variables: `os.environ.get("HF_TOKEN")`
- Never commit API keys to version control
- Consider rate limiting and authentication