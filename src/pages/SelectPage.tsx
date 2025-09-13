import React from "react";
import { type GameAction } from "../customHooks/gameReducer";

type SelectPageProps = {
  dispatch: React.Dispatch<GameAction>;
};

function StartPage({ dispatch }: SelectPageProps) {
  const handleSelect = (spreadID: number) => {
    dispatch({ type: "SET_SPREAD", spread: spreadID });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="mb-4">Choose your spread to begin:</p>

      <div className="flex gap-3">
        {[1, 2, 3].map((id) => (
          <button
            key={id}
            className="bg-blue-500 hover:bg-blue-900 text-3xl"
            onClick={() => handleSelect(id)}
          >
            Select {id.toString()}
          </button>
        ))}
      </div>
    </div>
  );
}

export default StartPage;
