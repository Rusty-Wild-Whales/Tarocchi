import React from "react";
import { type GameAction } from "../customHooks/gameReducer";

type ScenePageProps = {
  dispatch: React.Dispatch<GameAction>;
  spread: number | null;
  idx: number;
};

function ScenePage({ dispatch, spread, idx }: ScenePageProps) {
  const handleStart = () => {
    dispatch({ type: "NEXT_SCENE" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Tarot Game</h1>
      <p className="mb-4">Choose your spread to begin:</p>

      <div className="flex flex-col gap-3 bg-red-300">THIS_IS_THE_SCENE_PAGE</div>
      <div className="flex flex-col gap-3 bg-red-300">SPREAD_NUMBER {spread}</div>
      <div className="flex flex-col gap-3 bg-red-300">SCENE_IDX {idx}</div>

      <button className="bg-blue-500 hover:bg-blue-900 text-3xl" onClick={() => handleStart()}>
        StartPage
      </button>
    </div>
  );
}

export default ScenePage;
