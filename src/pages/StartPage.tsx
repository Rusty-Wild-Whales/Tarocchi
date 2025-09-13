import React from "react";
import { type GameAction } from "../customHooks/gameReducer";

type StartPageProps = {
  dispatch: React.Dispatch<GameAction>;
};

function StartPage({ dispatch }: StartPageProps) {
  const handleStart = () => {
    dispatch({ type: "LANDING" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button className="bg-blue-500 hover:bg-blue-900 text-3xl" onClick={() => handleStart()}>
        StartPage
      </button>
    </div>
  );
}

export default StartPage;
