import React from "react";
import { type GameAction } from "../customHooks/gameReducer";

type ResultPageProps = {
  dispatch: React.Dispatch<GameAction>;
  choices: string;
};

function ResultPage({ dispatch, choices }: ResultPageProps) {
  return (
    <div className="bg-indigo-900/70 rounded-xl shadow-lg px-8 py-6 text-white">
      <h2 className="text-2xl mb-4">Your Journey</h2>
      <ul className="list-disc text-left space-y-2">
        {choices.split(",").map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  );
}

export default ResultPage;
