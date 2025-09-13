// server.js - Simple Express backend for Claude API
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ 
    message: 'Backend is working!', 
    timestamp: new Date(),
    features: ['basic-chat', 'advanced-prompts', 'storage', 'scenarios'],
    apiKeyConfigured: !!process.env.CLAUDE_API_KEY
  });
});

// Browser-testable endpoint
app.get('/api/claude-status', (req, res) => {
  res.json({
    status: 'Claude endpoint is working (POST only)',
    apiKeyConfigured: !!process.env.CLAUDE_API_KEY,
    timestamp: new Date(),
    note: 'Use POST requests with message data to /api/claude'
  });
});

// Claude API endpoint
app.post('/api/claude', async (req, res) => {
  console.log('📨 Received request:', {
    hasMessage: !!req.body?.message,
    hasSystemPrompt: !!req.body?.systemPrompt,
    maxTokens: req.body?.maxTokens,
    hasApiKey: !!process.env.CLAUDE_API_KEY,
    messageLength: req.body?.message?.length
  });

  try {
    const { 
      message, 
      systemPrompt,
      maxTokens = 2000,
      temperature = 0.8
    } = req.body;

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
    
    let fullMessage = message;
    if (systemPrompt) {
      fullMessage = `${systemPrompt}\n\n${message}`;
    }

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
        temperature: temperature,
        messages: [{ role: 'user', content: fullMessage }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Claude API Error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: `Claude API Error: ${response.status}`,
        details: errorText
      });
    }

    const data = await response.json();

    const inputCost = (data.usage.input_tokens / 1_000_000) * 3;
    const outputCost = (data.usage.output_tokens / 1_000_000) * 15;
    
    res.json({ 
      response: data.content[0].text,
      usage: {
        input_tokens: data.usage.input_tokens,
        output_tokens: data.usage.output_tokens,
        total_cost: inputCost + outputCost
      },
      metadata: {
        systemPrompt: systemPrompt,
        maxTokens: maxTokens,
        temperature: temperature
      },
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

app.post('/api/test-claude', async (req, res) => {
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch('http://localhost:3001/api/claude', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        message: 'Hello, this is a test. Please respond with "Advanced system test successful!"',
        maxTokens: 100
      })
    });

    if (response.ok) {
      const data = await response.json();
      res.json({ 
        success: true, 
        testResponse: data.response,
        message: 'Advanced Claude system is working!'
      });
    } else {
      const errorData = await response.json();
      res.json({ success: false, error: errorData.error });
    }
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Enhanced Claude server running on http://localhost:${PORT}`);
  console.log(`📊 Test (GET): http://localhost:${PORT}/test`);
  console.log(`🔍 Claude Status (GET): http://localhost:${PORT}/api/claude-status`);
  console.log(`🤖 Claude Endpoint (POST): http://localhost:${PORT}/api/claude`);
  console.log(`🧪 Test Endpoint (POST): http://localhost:${PORT}/api/test-claude`);
  console.log(`🔑 API Key configured: ${!!process.env.CLAUDE_API_KEY}`);
});