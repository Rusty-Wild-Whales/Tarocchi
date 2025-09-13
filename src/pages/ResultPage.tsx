import React from "react";
import { type GameAction } from "../customHooks/gameReducer";

type ResultPageProps = {
  dispatch: React.Dispatch<GameAction>;
};

function ResultPage({ dispatch }: ResultPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Tarot Game</h1>
      <p className="mb-4">Choose your spread to begin:</p>

      <div className="flex flex-col gap-3">asdf</div>
    </div>
  );
}

export default ResultPage;
