import React, { useState } from "react";
import { type GameAction } from "../customHooks/gameReducer";
import wizardImage from "../assets/wizard.png";

type SelectPageProps = {
  dispatch: React.Dispatch<GameAction>;
};

function SelectPage({ dispatch }: SelectPageProps) {
  const [textIndex, setTextIndex] = useState(0);

  const dialogue = [
    "Now, in this enchanted workshop, you will choose a formation, the sacred layout of cards!",
    "You may divine with: Three-Cards spread: Ah, the classic! Past, Present, Future. Quick, sharp, elegant, like a magician's coin trick.",
    "Compass Spread: Four cards, four directions. South is where you've come from, West is what you've left behind",
    "East is what waits in the misty future, and North is the advice, the path forward. The perfect spread for a traveler who is lost…",
    "V Spread: Five cards shaped like a fork in the road. One card at the bottom shows your root, the foundation of your question. Then the path splits!",
    "To the left, one card reveals Choice A, followed by its outcome.",
    "To the right, one card reveals Choice B, followed by its outcome. A perfect spread for decisions, crossroads, and dramatic dilemmas.",
    "Once chosen, you will enter curious little tests! Each test echoes the drawing of a card. Now, traveler, choose your formation, and let us begin weaving your story!",
  ];

  const handleNext = () => {
    if (textIndex < dialogue.length - 1) {
      setTextIndex((i) => i + 1);
    }
  };

  const handleSelect = (spreadID: number) => {
    dispatch({ type: "SET_SPREAD", spread: spreadID });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-start gap-6 -translate-x-10">
        {/* Wizard image with animation */}
        <img
          src={wizardImage}
          alt="wizard"
          className="w-100 h-auto flex-shrink-0 animate-floatSway"
        />

        {/* Speech bubble */}
        <div className="relative w-[560px] h-[220px] bg-indigo-800 text-white rounded-3xl p-6 shadow-2xl border border-purple-400/70">
          <div className="h-full pr-14">
            <p
              className="h-[180px] overflow-y-auto text-2xl leading-relaxed tracking-wide"
              style={{ fontFamily: '"Cinzel Decorative", cursive' }}
            >
              {dialogue[textIndex]}
            </p>
            <div className="h-[24px]" />
          </div>

          {/* Tail */}
          <div className="absolute -left-3 top-10 w-0 h-0 border-t-8 border-b-8 border-r-[14px] border-t-transparent border-b-transparent border-r-indigo-800" />

          {/* Next button */}
          {textIndex < dialogue.length - 1 && (
            <button
              onClick={handleNext}
              aria-label="Next"
              className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-purple-600 text-white shadow-lg
                         hover:bg-purple-700 transition duration-200 hover:scale-110 animate-pulse-soft"
            >
              →
            </button>
          )}
        </div>
      </div>

      {/* Spread selection */}
      <p className="mt-10 mb-4 text-xl font-semibold text-purple-200">
        Choose your spread to begin:
      </p>
      <div className="flex gap-6">
        <button
          className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-900 text-white px-6 py-3 text-xl font-bold rounded-xl shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-purple-500/40"
          onClick={() => handleSelect(3)}
        >
          Three-Card Spread
        </button>
        <button
          className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-900 text-white px-6 py-3 text-xl font-bold rounded-xl shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-purple-500/40"
          onClick={() => handleSelect(4)}
        >
          Compass Spread
        </button>
        <button
          className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-900 text-white px-6 py-3 text-xl font-bold rounded-xl shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-purple-500/40"
          onClick={() => handleSelect(5)}
        >
          V Spread
        </button>
      </div>
    </div>
  );
}

export default SelectPage;
