import React from "react";
import { type GameAction } from "../customHooks/gameReducer";

type ResultPageProps = {
  dispatch: React.Dispatch<GameAction>;
};

function ResultPage({ dispatch }: ResultPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col gap-3 bg-red-300">THIS_IS_THE_RESULT_PAGE</div>
    </div>
  );
}

export default ResultPage;
