import React, { useState } from "react";
import { type GameAction } from "../customHooks/gameReducer";
import wizardImage from "../assets/wizard.png";
import { TypewriterText } from "../components/TypeWriter";

type SelectPageProps = {
  dispatch: React.Dispatch<GameAction>;
};

function SelectPage({ dispatch }: SelectPageProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const [lift, setLift] = useState(false); // triggers float-up

  const dialogue = [
    "Now, in this enchanted workshop, you will choose a formation, the sacred layout of cards!",
    "Three-Cards Spread: Past, Present, Future. Quick, sharp, elegant, like a magician's coin trick.",
    "Compass Spread: Four cards, four directions. South is your past, West what you've left behind, East what awaits in the mist, North the advice, the path forward.",
    "V Spread: Five cards shaped like a fork in the road. The bottom card is your root. The left side reveals Choice A and its outcome, the right side Choice B and its outcome.",
    "Once chosen, you will enter curious little tests! Each test echoes the drawing of a card. Choose wisely, traveler…",
  ];

  const isLastLine = textIndex >= dialogue.length - 1;

  const handleNext = () => {
    if (!isLastLine) {
      setTextIndex((i) => i + 1);
    } else {
      setLift(true);
      setTimeout(() => setShowChoices(true), 1200);
    }
  };

  const handleSkip = () => {
    setTextIndex(dialogue.length - 1);
    setLift(true);
    setTimeout(() => setShowChoices(true), 1200);
  };

  const handleSelect = (spreadID: number) => {
    dispatch({ type: "SET_SPREAD", spread: spreadID });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-pixel animate-fadeIn">
      {/* Wizard + dialogue bubble */}
      <div
        className={`flex items-start gap-6 -translate-x-10 relative z-10 ${
          lift ? "animate-floatUp" : ""
        }`}
      >
        {/* Wizard */}
        <div className="relative">
          <div className="absolute inset-0 blur-2xl bg-purple-500/30 rounded-full" />
          <img
            src={wizardImage}
            alt="wizard"
            className="relative w-96 h-auto flex-shrink-0 animate-floatSway"
          />
        </div>

        {/* Dialogue bubble */}
        <div className="relative w-[560px] h-[240px] bg-indigo-800 text-white rounded-3xl p-6 shadow-2xl border border-purple-400/70">
          <div className="h-full pr-14">
            <p className="h-[200px] overflow-y-auto text-lg leading-relaxed tracking-wide text-left">
              <TypewriterText text={dialogue[textIndex]} speed={1} />
            </p>

            {/* Skip button */}
            {!lift && (
              <button
                onClick={handleSkip}
                className="absolute top-2 right-2 px-3 py-1 text-xs rounded-md bg-purple-700/80 text-white hover:bg-purple-800 transition"
              >
                Skip
              </button>
            )}
          </div>

          {/* Tail */}
          <div className="absolute -left-3 top-10 w-0 h-0 border-t-8 border-b-8 border-r-[14px] border-t-transparent border-b-transparent border-r-indigo-800" />

          {/* Next button */}
          {!lift && (
            <button
              onClick={handleNext}
              aria-label="Next"
              className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-purple-600 text-white shadow-lg
                 transition transform duration-150 ease-out
                 hover:bg-purple-700 hover:scale-110
                 active:scale-90 active:bg-purple-800
                 focus:outline-none focus:ring-4 focus:ring-purple-400/60
                 animate-pulse-soft text-sm"
            >
              →
            </button>
          )}
        </div>
      </div>

      {/* Spread choices (fade-in after float-up) */}
      {showChoices && (
        <div className="animate-fadeIn h-50 -mt-50 text-center">
          <p className="mb-6 text-xl mt-50 font-bold text-white drop-shadow-lg">
            Choose your spread to begin
          </p>
          <div className="flex gap-6 justify-center">
            {["Three-Card Spread", "Compass Spread", "V Spread"].map(
              (spreadName, idx) => (
                <button
                  key={idx}
                  className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-900 text-white px-6 py-3 text-lg font-bold rounded-lg shadow-xl transition-transform duration-300 hover:scale-110 hover:shadow-purple-500/40"
                  onClick={() => handleSelect(idx + 1)}
                >
                  {spreadName}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectPage;
