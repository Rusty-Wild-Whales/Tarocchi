import React from "react";
import { type GameAction } from "../customHooks/gameReducer";

type ResultPageProps = {
  dispatch: React.Dispatch<GameAction>;
  choices: string;
};

function ResultPage({ dispatch, choices }: ResultPageProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col gap-3 bg-red-300">THIS_IS_THE_RESULT_PAGE</div>
        <p className="bg-blue-300">USER_INPUTED: {choices}</p>
      </div>
    </>
  );
}

export default ResultPage;
