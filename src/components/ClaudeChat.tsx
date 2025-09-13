/* How to use on local:

step 1: start backend
-> cd claude-backend
-> node server.js

step 1.5 (optional): test backend
visit http://localhost:3001/test, see status messages (should be 2)

step 2: start react
-> pnpm run dev

import with following:
import ClaudeChat from "./components/ClaudeChat.tsx";
*/


import React, { useState } from 'react';
import { useClaudeAPI } from '../customHooks/useClaudeAPI';

const ClaudeChat: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const { response, loading, error, askClaude } = useClaudeAPI();

  const handleSubmit = (): void => {
    if (input.trim()) {
      askClaude(input);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Simple Claude Chat</h1>
      
      <div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Claude something..."
          rows={4}
          style={{ width: '100%', marginBottom: '10px' }}
          disabled={loading}
        />
        <button 
          onClick={handleSubmit} 
          disabled={loading || !input.trim()}
          style={{ padding: '10px 20px' }}
        >
          {loading ? 'Asking...' : 'Ask Claude'}
        </button>
      </div>

      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          Error: {error}
        </div>
      )}

      {response && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f5f5f5' }}>
          <strong>Claude's Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default ClaudeChat;