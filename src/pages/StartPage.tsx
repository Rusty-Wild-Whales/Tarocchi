import React from "react";
import { type GameAction } from "../customHooks/gameReducer";

type StartPageProps = {
  dispatch: React.Dispatch<GameAction>;
};

function StartPage({ dispatch }: StartPageProps) {
  const handleSelect = (spreadID: number) => {
    dispatch({ type: "SET_SPREAD", spread: spreadID });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Tarot Game</h1>
      <p className="mb-4">Choose your spread to begin:</p>

      <div className="flex flex-col gap-3">asdf</div>

      <button className="bg-blue-500 hover:bg-blue-900" onClick={() => handleSelect(1)}>
        asdf
      </button>
    </div>
  );
}

export default StartPage;
