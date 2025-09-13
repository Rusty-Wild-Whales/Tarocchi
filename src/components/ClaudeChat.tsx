/* How to use on local:

step 1: start backend
$ cd claude-backend
$ pnpm install (first-time setup)
$ node server.js

step 1.5 (optional): test backend
visit http://localhost:3001/test, see status messages (should be 2)

step 2: start react
$ pnpm run dev
*/


import React, { useState, useEffect, useRef } from 'react';
import { useClaudeAPI } from '../customHooks/useClaudeAPI';
import { type ResultPageProps } from '../pages/ResultPage.tsx';

const ClaudeChat: React.FC<ResultPageProps> = ({
    choices,
    prompt,
    spread,
    cards
}) => {
  // Interactive Feature State
  const [userInput, setUserInput] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [currentResult, setCurrentResult] = useState<string>('');

  // Scenario Generator State
  const [autoScenario, setAutoScenario] = useState<string>('');
  const [scenarioLoading, setScenarioLoading] = useState<boolean>(false);

  // Backend status
  const [backendStatus, setBackendStatus] = useState<string>('Checking...');

  // Search functionality
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Use the advanced hook
  const {
    responses,
    loading,
    error,
    askClaude,
  } = useClaudeAPI();


  // Check backend status on component mount
  useEffect(() => {
    checkBackendStatus();
    // Auto-generate a scenario on load
    generateScenario();
    // Load saved input
    const savedInput = localStorage.getItem('current-user-input');
    if (savedInput) {
      setUserInput(savedInput);
    }
  }, []);

  const checkBackendStatus = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/claude-status');
      if (response.ok) {
        const data = await response.json();
        setBackendStatus(data.apiKeyConfigured ? '✅ Backend & API Ready' : '⚠️ Backend OK, API Key Missing');
      } else {
        setBackendStatus('❌ Backend Connection Failed');
      }
    } catch (err) {
      setBackendStatus('❌ Backend Not Running');
    }
  };

  const testSystem = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3001/api/test-claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await response.json();
      if (data.success) {
        alert(`✅ System Test Passed!\n\nClaude responded: "${data.testResponse}"`);
      } else {
        alert(`❌ System Test Failed!\n\nError: ${data.error}`);
      }
    } catch (err) {
      alert(`❌ System Test Failed!\n\nError: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  // Tarot Reading Generator
  const generateScenario = async (): Promise<void> => {
    setScenarioLoading(true);

    try {
      const result = await askClaude({
        message: 'Generate a response based on the prompt',
        systemPrompt: `
        You are an experienced and intuitive tarot reader named Tarocchi with deep knowledge of card meanings, symbolism, and divination. You will perform a tarot reading based on the cards you are given, the user's question, and their intuitive choices.
        Your personality is rather humorous and witty at times, but serious at others. Stay relatively concise while still being thorough.
        As you generate your response, do not use text formatting methods such as using asterisks for italics or bold, as they will not work.

        READING PROCESS:
        1. You are given three to five tarot cards to interpret, a question the user would like answered through a reading, and a series of intuitive choices the user has made.
        2. If you are given three cards, use the Past-Present-Future spread. If you are given four cards, use the Compass spread. If you are given five cards, use the V spread (for branching choices).
        3. Provide detailed interpretations, connecting the cards to their question. Consider the emotional tone and imagery of their choices, and tie in their intuitive choices as you see fit.
        4. Give practical guidance and insights

        INTERPRETATION STYLE:
        - Be insightful but not absolute in predictions
        - Connect card meanings to their specific question
        - Explain how their choices led to these particular cards
        - Provide actionable guidance
        - Use rich symbolic language while remaining accessible
        - Acknowledge free will and personal agency

        RESPONSE FORMAT:
        1. Brief acknowledgment of their question and choices
        2. The selected cards with position explanations
        3. Detailed interpretation of each card in its position
        4. Overall reading synthesis
        5. Practical guidance and next steps

        Be mystical yet grounded, intuitive yet logical, mysterious yet helpful.
        
        The question the user has asked is ${prompt}.
        The choices the user made are ${choices.join(", ")}.
        There are ${spread + 2} cards in the formation.
        The cards that were selected are ${cards.join(", ")}.`,
        maxTokens: 5000,
        temperature: 1.0
      });

      if (result) {
        setAutoScenario(result.content);
      }
    } catch (err) {
      console.error('Scenario generation failed:', err);
      setAutoScenario('Failed to generate scenario. Please try again.');
    } finally {
      setScenarioLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ width: "auto", gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>

        {/* FEATURE 2: Automatic Scenario Generator */}
        <div className="bg-indigo-900/70 rounded-xl shadow-lg px-8 py-6 text-white w-auto">
        <ul className="list-disc text-left space-y-2">

          <p style={{ color: '#ebdbff', fontSize: '18px', marginBottom: '15px' }}>
            Infinite possibilities converge into one path ahead...
          </p>

          <button
            onClick={generateScenario}
            disabled={scenarioLoading || loading}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: (scenarioLoading || loading) ? '#ccc' : '#7212cc',
              color: '#ebdbff',
              border: 'none',
              borderRadius: '6px',
              marginBottom: '15px',
              cursor: (scenarioLoading || loading) ? 'not-allowed' : 'pointer'
            }}
          >
            {scenarioLoading ? 'Generating...' : 'Your Reading'}
          </button>

          {/* Auto scenario display */}
          {autoScenario && (
            <div style={{ 
              padding: '15px', 
              backgroundColor: '#6a329f',
              border: '1px solid #58078c',
              borderRadius: '8px',
              maxHeight: '400px',
              overflowY: 'auto'
            }}>
              <div style={{ marginTop: '10px', whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.5' }}>
                {autoScenario}
              </div>
            </div>
          )}
        </ul>
      </div>
    </div>

      {/* Error display */}
      {error && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#ffe6e6', 
          border: '1px solid #ff9999',
          borderRadius: '8px',
          marginBottom: '20px',
          color: '#cc0000'
        }}>
          <strong>❌ Error:</strong> {error}
          <div style={{ fontSize: '12px', marginTop: '5px' }}>
            <strong>Common fixes:</strong>
            <ul style={{ margin: '5px 0 0 20px' }}>
              <li>Make sure backend server is running on port 3001</li>
              <li>Check your API key in backend/.env file</li>
              <li>Try the "Test System" button above</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaudeChat;