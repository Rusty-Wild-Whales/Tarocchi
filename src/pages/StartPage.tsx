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
  const [showChoices, setShowChoices] = useState(false);
  const [lift, setLift] = useState(false); // triggers float-up

  const dialogue = [
    "Ahhh… welcome traveler! Before you lies the threshold, where the ancient art of Tarot Cards shall be reborn in glowing light!!",
    "I, Maestro Tarrochi, your humble wizard, shall guide you into the realm where past and future entwine…",
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

  const handleStart = () => {
    dispatch({ type: "LANDING" });
  };

  const toggleMusic = () => {
    if (isPlaying) MusicPlayer.stop();
    else MusicPlayer.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen font-pixel">
      {/* Music button top-right */}
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-indigo-800/80 border border-purple-400 shadow-lg transition hover:scale-110 hover:bg-purple-700 text-sm"
      >
        {isPlaying ? "🔊" : "🔇"}
      </button>

      {/* Wizard + dialogue bubble */}
      <div
        className={`flex items-start space-x-6 -translate-x-10 relative z-10 ${
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
        <div className="relative w-[560px] h-[220px] bg-indigo-800 text-white rounded-3xl p-6 shadow-2xl border border-purple-400/70">
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

      {/* Begin button */}
      {showChoices && (
        <button
          className="-mt-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-900 text-white px-8 py-3 text-lg font-bold rounded-xl shadow-xl transition-transform duration-300 hover:scale-110 hover:shadow-purple-500/40 animate-fadeIn "
          onClick={handleStart}
        >
          Begin the Reading
        </button>
      )}
    </div>
  );
}

export default StartPage;
