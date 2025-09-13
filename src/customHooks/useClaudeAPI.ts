import { useState, useCallback } from 'react';

interface BackendResponse {
  response: string;
  usage?: any;
  timestamp?: string;
}

export const useClaudeAPI = () => {
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const askClaude = useCallback(async (message: string): Promise<void> => {
    setLoading(true);
    setError('');

    try {
      // Call your backend server instead of Claude directly
      const apiResponse = await fetch('http://localhost:3001/api/claude', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: message,
          maxTokens: 1000
        })
      });

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json().catch(() => ({}));
        throw new Error(errorData.error || `Server Error: ${apiResponse.status}`);
      }

      const data: BackendResponse = await apiResponse.json();
      setResponse(data.response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  return { response, loading, error, askClaude };
};