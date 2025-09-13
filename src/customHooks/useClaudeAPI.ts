import { useState, useCallback, useEffect } from 'react';

// Interface definitions (these were missing!)
interface ClaudeRequest {
  message: string;
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
  model?: string;
}

interface ClaudeResponse {
  id: string;
  content: string;
  timestamp: Date;
  usage?: {
    inputTokens: number;
    outputTokens: number;
    cost: number;
  };
  metadata?: {
    prompt: string;
    model: string;
    parameters: any;
  };
}

export const useClaudeAPI = () => {
  const [responses, setResponses] = useState<ClaudeResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Load stored responses on component mount
  useEffect(() => {
    const saved = localStorage.getItem('claude-responses');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setResponses(parsed);
      } catch (e) {
        console.error('Failed to load stored responses:', e);
      }
    }
  }, []);

  // Enhanced ask function with custom parameters
  const askClaude = useCallback(async (request: ClaudeRequest): Promise<ClaudeResponse | null> => {
    setLoading(true);
    setError('');

    try {
      console.log('🚀 Calling enhanced backend...');
      
      const apiResponse = await fetch('http://localhost:3001/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: request.message,
          systemPrompt: request.systemPrompt,
          maxTokens: request.maxTokens || 1000,
          temperature: request.temperature || 0.7
        })
      });

      console.log('Backend response status:', apiResponse.status);

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `API Error: ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      
      const response: ClaudeResponse = {
        id: Date.now().toString(),
        content: data.response,
        timestamp: new Date(),
        usage: {
          inputTokens: data.usage?.input_tokens || 0,
          outputTokens: data.usage?.output_tokens || 0,
          cost: data.usage?.total_cost || 0
        },
        metadata: {
          prompt: request.message,
          model: 'claude-sonnet-4-20250514',
          parameters: {
            systemPrompt: request.systemPrompt,
            maxTokens: request.maxTokens,
            temperature: request.temperature
          }
        }
      };

      // Store in state
      setResponses(prev => [response, ...prev]);
      
      // Store in localStorage
      const stored = JSON.parse(localStorage.getItem('claude-responses') || '[]');
      stored.unshift(response);
      localStorage.setItem('claude-responses', JSON.stringify(stored.slice(0, 100)));

      return response;
    } catch (err) {
      console.error('Hook error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Batch processing function
  const processBatch = useCallback(async (requests: ClaudeRequest[]): Promise<ClaudeResponse[]> => {
    const results: ClaudeResponse[] = [];
    
    for (const request of requests) {
      const response = await askClaude(request);
      if (response) {
        results.push(response);
        // Small delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return results;
  }, [askClaude]);

  // Data manipulation functions
  const exportResponses = useCallback((format: 'json' | 'csv' | 'txt' = 'json') => {
    const data = responses;
    
    switch (format) {
      case 'json':
        return JSON.stringify(data, null, 2);
      
      case 'csv':
        const headers = ['ID', 'Timestamp', 'Prompt', 'Response', 'Model', 'Tokens Used'];
        const rows = data.map(r => [
          r.id,
          r.timestamp.toISOString(),
          `"${r.metadata?.prompt?.replace(/"/g, '""') || ''}"`,
          `"${r.content.replace(/"/g, '""')}"`,
          r.metadata?.model || '',
          (r.usage?.inputTokens || 0) + (r.usage?.outputTokens || 0)
        ]);
        return [headers, ...rows].map(row => row.join(',')).join('\n');
      
      case 'txt':
        return data.map(r => 
          `=== ${r.timestamp.toLocaleString()} ===\n` +
          `PROMPT: ${r.metadata?.prompt || ''}\n\n` +
          `RESPONSE: ${r.content}\n\n`
        ).join('\n');
      
      default:
        return JSON.stringify(data, null, 2);
    }
  }, [responses]);

  const searchResponses = useCallback((query: string) => {
    return responses.filter(r => 
      r.content.toLowerCase().includes(query.toLowerCase()) ||
      r.metadata?.prompt?.toLowerCase().includes(query.toLowerCase())
    );
  }, [responses]);

  const filterByDate = useCallback((startDate: Date, endDate: Date) => {
    return responses.filter(r => 
      r.timestamp >= startDate && r.timestamp <= endDate
    );
  }, [responses]);

  const calculateCosts = useCallback(() => {
    return responses.reduce((total, r) => total + (r.usage?.cost || 0), 0);
  }, [responses]);

  return {
    responses,
    loading,
    error,
    askClaude,
    processBatch,
    exportResponses,
    searchResponses,
    filterByDate,
    calculateCosts
  };
};