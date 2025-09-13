import React from "react";
import { type GameAction } from "../customHooks/gameReducer";
import Card from "../components/Card";

type ScenePageProps = {
  dispatch: React.Dispatch<GameAction>;
  spread: number | null;
  idx: number;
};

function ScenePage({ dispatch, spread, idx }: ScenePageProps) {
  const handleStart = (str: string) => {
    dispatch({ type: "NEXT_SCENE", choice: str });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Tarot Game</h1>
      <p className="mb-4">Choose your spread to begin:</p>

      <div className="flex gap-5">
        {["1lorem", "2lorem", "3lorem"].map((str, idx) => (
          <div key={idx} onClick={() => handleStart(str)}>
            <Card>
              <p>{str}</p>
            </Card>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 bg-red-300">THIS_IS_THE_SCENE_PAGE</div>
      <div className="flex flex-col gap-3 bg-red-300">SPREAD_NUMBER {spread}</div>
      <div className="flex flex-col gap-3 bg-red-300">SCENE_IDX {idx}</div>
    </div>
  );
}

export default ScenePage;
