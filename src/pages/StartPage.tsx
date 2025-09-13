import React, { useState } from "react";
import { type GameAction } from "../customHooks/gameReducer";
import wizardImage from "../assets/wizard.png";
import MusicPlayer from "../components/MusicPlayer";
import { TypewriterText } from "../components/TypeWriter";

type StartPageProps = {
  dispatch: React.Dispatch<GameAction>;
};

function StartPage({ dispatch }: StartPageProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const dialogue = [
    "Ahhh… welcome traveler! Before you lies the threshold, where the ancient art of Tarot Cards shall be reborn in glowing light!!",
    "I, Maestro Tarocchi, your humble wizard, shall guide you into the realm where past and future entwine…",
    "Now, you may ask yourself, what are these Tarot cards I boast of?",
    "Each card bears a symbol, and each symbol holds a thousand meanings!",
  ];

  const handleNext = () => {
    if (textIndex < dialogue.length - 1) setTextIndex((i) => i + 1);
  };

  const handleStart = () => {
    dispatch({ type: "LANDING" });
  };

  const toggleMusic = () => {
    if (isPlaying) {
      MusicPlayer.stop();
    } else {
      MusicPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      {/* Music button top-right */}
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-indigo-800/80 border border-purple-400 shadow-lg transition hover:scale-110 hover:bg-purple-700"
      >
        {isPlaying ? "🔊" : "🔇"}
      </button>

      <div className="flex items-start space-x-6 -translate-x-10">
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
        <div className="relative w-[560px] h-[220px] bg-indigo-800 text-white rounded-3xl p-6 shadow-2xl border border-purple-400/70">
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

      {/* Start button */}
      <button
        className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-900 text-white px-10 py-4 text-2xl font-bold rounded-xl shadow-xl transition-transform duration-300 hover:scale-110 hover:shadow-purple-500/40"
        onClick={handleStart}
      >
        Begin the Reading
      </button>
    </div>
  );
}

export default StartPage;
