import React, { useState } from "react";
import { type GameAction } from "../customHooks/gameReducer";
import wizardImage from "../assets/wizard.png";
import MusicPlayer from "../components/MusicPlayer";

type StartPageProps = {
  dispatch: React.Dispatch<GameAction>;
};

function StartPage({ dispatch }: StartPageProps) {
  const [textIndex, setTextIndex] = useState(0);

  const dialogue = [
    "Ahhh… welcome traveler! Before you lies the threshold, where the ancient art of Tarot Cards shall be reborn in glowing light!!",
    "I, Maestro Tarocchi, your humble wizard, shall guide you into the realm where past and future entwine…",
    "Now, you may ask yourself, what are these Tarot cards I boast of?",
    "They are not mere painted slips of paper, oh no no; that would be an insult to the art of mysticism!",
    "Each card bears a symbol, and each symbol holds a thousand meanings. Together, they weave stories of love, loss, triumph, and folly.",
    "When a seeker draws the cards, they do not foretell a fixed future!",
    "They illuminate possibilities. It is you who grants them life by asking the question.",
  ];

  const handleNext = () => {
    if (textIndex < dialogue.length - 1) {
      setTextIndex((i) => i + 1);
    }
  };

  const handleStart = () => {
    dispatch({ type: "LANDING" });
    MusicPlayer.play();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-start space-x-6 -translate-x-10">
        {/* Wizard image with animation */}
        <img
          src={wizardImage}
          alt="wizard"
          className="w-100 h-auto flex-shrink-0 animate-floatSway"
        />

        {/* Speech bubble */}
        <div className="relative w-[560px] h-[200px] bg-indigo-800 text-white rounded-3xl p-6 shadow-2xl border border-purple-400/70">
          <div className="h-full pr-14">
            <p
              className="h-[200px] overflow-y-auto text-2xl leading-relaxed tracking-wide"
              style={{ fontFamily: '"Cinzel Decorative", cursive' }}
            >
              {dialogue[textIndex]}
            </p>
            <div className="h-[24px]" />
          </div>

          {/* Tail */}
          <div className="absolute -left-3 top-10 w-0 h-0 border-t-8 border-b-8 border-r-[14px] border-t-transparent border-b-transparent border-r-indigo-800" />

          {/* Next button (anchored, pulsing) */}
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

      {/* Start button */}
      <button
        className="mt-12 bg-purple-700 hover:bg-purple-900 text-white px-8 py-3 text-2xl font-bold rounded-xl shadow-lg tracking-wider
                   transition-transform duration-300 hover:scale-110 hover:shadow-purple-500/40"
        onClick={handleStart}
      >
        Begin the Reading
      </button>
    </div>
  );
}

export default StartPage;
