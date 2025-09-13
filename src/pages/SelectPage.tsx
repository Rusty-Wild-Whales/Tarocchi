import React, { useState } from "react";
import { type GameAction } from "../customHooks/gameReducer";
import wizardImage from "../assets/wizard.png";
import { TypewriterText } from "../components/TypeWriter";

type SelectPageProps = {
  dispatch: React.Dispatch<GameAction>;
};

function SelectPage({ dispatch }: SelectPageProps) {
  const [textIndex, setTextIndex] = useState(0);

  const dialogue = [
    "Now, in this enchanted workshop, you will choose a formation, the sacred layout of cards!",
    "Three-Cards Spread: Past, Present, Future. Quick, sharp, elegant, like a magician's coin trick.",
    "Compass Spread: Four cards, four directions. South is your past, West what you've left behind, East what awaits in the mist, North the advice, the path forward.",
    "V Spread: Five cards shaped like a fork in the road. The bottom card is your root. The left side reveals Choice A and its outcome, the right side Choice B and its outcome.",
    "Once chosen, you will enter curious little tests! Each test echoes the drawing of a card. Choose wisely, traveler…",
  ];

  const handleNext = () => {
    if (textIndex < dialogue.length - 1) setTextIndex((i) => i + 1);
  };

  const handleSelect = (spreadID: number) => {
    dispatch({ type: "SET_SPREAD", spread: spreadID });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-start gap-6 -translate-x-10">
        {/* Wizard with aura */}
        <div className="relative">
          <div className="absolute inset-0 blur-2xl bg-purple-500/30 rounded-full" />
          <img
            src={wizardImage}
            alt="wizard"
            className="relative w-96 h-auto flex-shrink-0 animate-floatSway"
          />
        </div>

        {/* Speech bubble */}
        <div className="relative w-[560px] h-[240px] bg-indigo-800 text-white rounded-3xl p-6 shadow-2xl border border-purple-400/70">
          <div className="h-full pr-14">
            <p
              className="h-[200px] overflow-y-auto text-2xl leading-relaxed tracking-wide font-light"
              style={{ fontFamily: '"Cinzel Decorative", cursive' }}
            >
              <TypewriterText text={dialogue[textIndex]} speed={25} />
            </p>
          </div>

          {/* Tail */}
          <div className="absolute -left-3 top-10 w-0 h-0 border-t-8 border-b-8 border-r-[14px] border-t-transparent border-b-transparent border-r-indigo-800" />

          {/* Next button */}
          {textIndex < dialogue.length - 1 && (
            <button
              onClick={handleNext}
              aria-label="Next"
              className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-purple-600 text-white shadow-lg
             transition transform duration-150 ease-out
             hover:bg-purple-700 hover:scale-110
             active:scale-90 active:bg-purple-800
             focus:outline-none focus:ring-4 focus:ring-purple-400/60
             animate-pulse-soft"
            >
              →
            </button>
          )}
        </div>
      </div>

      {/* Spread selection */}
      <p
        className="mt-12 mb-6 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 drop-shadow-lg"
        style={{ fontFamily: '"Cinzel Decorative", cursive' }}
      >
        Choose your spread to begin
      </p>
      <div className="flex gap-6">
        <button
          className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-900 text-white px-8 py-4 text-xl font-bold rounded-xl shadow-xl transition-transform duration-300 hover:scale-110 hover:shadow-purple-500/40"
          onClick={() => handleSelect(3)}
        >
          Three-Card Spread
        </button>
        <button
          className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-900 text-white px-8 py-4 text-xl font-bold rounded-xl shadow-xl transition-transform duration-300 hover:scale-110 hover:shadow-purple-500/40"
          onClick={() => handleSelect(4)}
        >
          Compass Spread
        </button>
        <button
          className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-900 text-white px-8 py-4 text-xl font-bold rounded-xl shadow-xl transition-transform duration-300 hover:scale-110 hover:shadow-purple-500/40"
          onClick={() => handleSelect(5)}
        >
          V Spread
        </button>
      </div>
    </div>
  );
}

export default SelectPage;
