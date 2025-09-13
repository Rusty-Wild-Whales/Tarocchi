import React, { useState } from "react";
import { type GameAction } from "../customHooks/gameReducer";
import wizardImage from "../assets/wizard.png";

type SelectPageProps = {
  dispatch: React.Dispatch<GameAction>;
};

function SelectPage({ dispatch }: SelectPageProps) {
  const [textIndex, setTextIndex] = useState(0);

  const dialogue = [
    "Now, in this enchanted workshop of wires and wonders, you will choose a formation, the sacred layout of cards!",
    "You may divine with: Three-Cards spread: Ah, the classic! Past, Present, Future. Quick, sharp, elegant, like a magician's coin trick.",
    "Compass Spread: Four cards, four directions. South is where you've come from, West is what you've left behind, East is what waits in the misty future, and North is the advice, the path forward. The perfect spread for a traveler who is lost…",
    "V Spread: Five cards shaped like a fork in the road. One card at the bottom shows your root, the foundation of your question. Then the path splits!",
    "To the left, one card reveals Choice A, followed by its outcome. To the right, one card reveals Choice B, followed by its outcome. A perfect spread for decisions, crossroads, and dramatic dilemmas.",
    "Once chosen, you will enter curious little tests! Each test echoes the drawing of a card. Now, traveler, choose your formation, and let us begin weaving your story!",
  ];

  const handleNext = () => {
    if (textIndex < dialogue.length - 1) {
      setTextIndex(textIndex + 1);
    }
  };

  const handleSelect = (spreadID: number) => {
    dispatch({ type: "SET_SPREAD", spread: spreadID });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-start space-x-6 -translate-x-16">
        {/* Wizard image */}
        <img
          src={wizardImage}
          alt="wizard"
          className="w-125 h-auto flex-shrink-0"
        />

        {/* Speech bubble */}
        <div className="relative bg-blue-400 text-white rounded-2xl p-6 max-w-sm shadow-lg">
          <p
            className="text-4xl leading-relaxed tracking-wide"
            style={{ fontFamily: '"Cinzel Decorative", cursive' }}
          >
            {dialogue[textIndex]}
          </p>

          {/* Next button inside bubble */}
          {textIndex < dialogue.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute bottom-2 right-2 bg-white text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-gray-200"
            >
              Next
            </button>
          )}

          {/* Speech bubble tail */}
          <div className="absolute left-[-12px] top-8 w-0 h-0 border-t-8 border-b-8 border-r-12 border-t-transparent border-b-transparent border-r-blue-400"></div>
        </div>
      </div>

      {/* Spread selection */}
      <p className="mt-8 mb-4 text-lg">Choose your spread to begin:</p>
      <div className="flex gap-3">
        {[1, 2, 3].map((id) => (
          <button
            key={id}
            className="bg-blue-500 hover:bg-blue-900 text-white px-4 py-2 text-xl rounded-lg"
            onClick={() => handleSelect(id)}
          >
            Select {id}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SelectPage;
