// server.js - Simple Express backend for Claude API
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!', timestamp: new Date() });
});

// Claude API endpoint
app.post('/api/claude', async (req, res) => {
  console.log('📨 Received request:', {
    hasApiKey: !!process.env.CLAUDE_API_KEY,
    messageLength: req.body?.message?.length
  });

  try {
    const { message, maxTokens = 1000 } = req.body;

    // Validate input
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check API key
    if (!process.env.CLAUDE_API_KEY) {
      return res.status(500).json({ 
        error: 'CLAUDE_API_KEY not found in environment variables' 
      });
    }

    console.log('🚀 Calling Claude API...');

    // Import fetch for Node.js (if using Node < 18)
    const fetch = (await import('node-fetch')).default;
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: maxTokens,
        messages: [{ role: 'user', content: message }]
      })
    });

    console.log('📡 Claude API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Claude API Error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: `Claude API Error: ${response.status}`,
        details: errorText
      });
    }

    const data = await response.json();
    console.log('✅ Success! Response length:', data.content[0].text.length);
    
    res.json({ 
      response: data.content[0].text,
      usage: data.usage,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('💥 Server Error:', error.message);
    res.status(500).json({ 
      error: 'Server error', 
      message: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Claude backend server running on http://localhost:${PORT}`);
  console.log(`📊 Test endpoint: http://localhost:${PORT}/test`);
  console.log(`🤖 Claude endpoint: http://localhost:${PORT}/api/claude`);
  console.log(`🔑 API Key configured: ${!!process.env.CLAUDE_API_KEY}`);
});