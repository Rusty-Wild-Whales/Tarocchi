import React from "react";
import { type GameAction } from "../customHooks/gameReducer";

type ResultPageProps = {
  dispatch: React.Dispatch<GameAction>;
  choices: string;
  prompt?: string;
};

function ResultPage({ dispatch, choices, prompt }: ResultPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <h1
        className="text-4xl font-bold text-purple-300 drop-shadow-lg"
        style={{ fontFamily: '"Cinzel Decorative", cursive' }}
      >
        Your Journey
      </h1>

      {prompt && (
        <div className="bg-purple-900/70 text-white px-8 py-4 rounded-xl shadow-lg max-w-2xl">
          <p className="text-lg italic">Your question:</p>
          <p className="mt-2 text-xl">{prompt}</p>
        </div>
      )}

      <div className="bg-indigo-900/70 rounded-xl shadow-lg px-8 py-6 text-white max-w-2xl">
        <h2 className="text-2xl mb-4">The paths you chose:</h2>
        <ul className="list-disc text-left space-y-2">
          {choices.split(",").map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ResultPage;
