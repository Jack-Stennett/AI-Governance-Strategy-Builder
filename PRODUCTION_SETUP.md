# Production Setup Guide

## 🏗️ Setting Up Your AI Governance Tool for Production

This guide helps you deploy the tool with your own Hugging Face Pro account for reliable AI enhancement.

### 1. Get Hugging Face Pro Account

1. **Sign up** at https://huggingface.co/
2. **Add payment method** in Settings → Billing
3. **Get API token** from Settings → Access Tokens
4. **Create token** with "Read" permissions

### 2. Update Your Code

**Replace the API token in `src/app.js`:**

```javascript
// Line ~1001 in src/app.js
const HF_API_TOKEN = 'YOUR_ACTUAL_HF_TOKEN_HERE';
```

⚠️ **Important**: Never commit your real API token to public GitHub repos!

### 3. Recommended Models & Pricing

**Best Models for Production:**
- `meta-llama/Llama-3.2-3B-Instruct` - $0.0001/1K tokens (recommended)
- `microsoft/DialoGPT-medium` - $0.00005/1K tokens (cheapest)
- `google/flan-t5-large` - $0.00008/1K tokens (fast)

**Cost Estimate:**
- Average request: ~500 input + 200 output tokens = ~$0.00007
- 1000 users/month ≈ **$70/month** (very reasonable)

### 4. Set Budget Limits

In Hugging Face → Settings → Billing:
- Set **monthly spending limit** (e.g. $100/month)
- Enable **usage alerts** at 50% and 80%
- Monitor **daily usage** dashboard

### 5. Monitor Usage

The tool automatically logs:
- ✅ Model requests and responses
- ✅ Token usage (input/output)
- ✅ Error rates and types
- ✅ User sessions and patterns

**View logs in browser console:**
```javascript
// Check usage logs
JSON.parse(localStorage.getItem('aiGov_apiLogs'))
```

**For production monitoring, add analytics endpoint:**
```javascript
// Uncomment line ~1167 in src/app.js
fetch('/api/log-usage', { method: 'POST', body: JSON.stringify(logData) });
```

### 6. Security Best Practices

**For GitHub Pages deployment:**
1. Use environment variables or separate config file
2. Consider using GitHub Actions for token injection
3. Never commit real tokens to version control

**Alternative: Backend Proxy**
```javascript
// Instead of direct HF API calls, proxy through your backend
const response = await fetch('/api/enhance-analysis', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt, model: modelId })
});
```

### 7. Rate Limiting

The tool includes basic protection:
- 30-second request timeout
- Error handling for rate limits (429)
- Graceful fallback to original analysis

**For heavy usage, consider:**
- Request queuing
- Per-user rate limits  
- Caching common responses

### 8. Deploy to GitHub Pages

1. **Update your code** with real HF token
2. **Commit and push** to your repository
3. **Enable GitHub Pages** in Settings → Pages
4. **Test thoroughly** at your live URL

### 9. Go Live!

Your tool will be available at:
**https://jack-stennett.github.io/AI-Governance-Tool-LLM-Enabled**

Users get professional AI-enhanced strategic analysis without needing their own API keys!

## 🔧 Troubleshooting

**Model not found (404):** Check model exists on HF Inference API  
**Rate limited (429):** Upgrade HF plan or add request delays  
**Out of credits:** Check HF billing dashboard  
**Token errors (401):** Verify token is correct and has proper permissions

## 📊 Success Metrics

Monitor these in your HF dashboard:
- **Requests per day** - user engagement
- **Token usage** - actual costs
- **Error rate** - system reliability  
- **Response time** - user experience

---

**Estimated Monthly Cost:** $50-150 for typical demo usage  
**User Experience:** Professional AI analysis with zero setup  
**Maintenance:** Monitor dashboard weekly, adjust budget as needed