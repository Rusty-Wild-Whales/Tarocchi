import React from "react";
import { type GameAction } from "../customHooks/gameReducer";
import wizardImage from "../assets/wizard.png";

type StartPageProps = {
  dispatch: React.Dispatch<GameAction>;
};

function StartPage({ dispatch }: StartPageProps) {
  const handleStart = () => {
    dispatch({ type: "LANDING" });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex">
          <img src={wizardImage}></img>
          <div>
            <p className="bg-blue-400">asdf</p>
          </div>
        </div>
        <button className="bg-blue-500 hover:bg-blue-900 text-3xl" onClick={() => handleStart()}>
          StartPage
        </button>
      </div>
    </>
  );
}

export default StartPage;
