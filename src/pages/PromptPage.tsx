import React, { useState } from "react";
import { type GameAction } from "../customHooks/gameReducer";
import wizardImage from "../assets/wizard.png";
import { TypewriterText } from "../components/TypeWriter";

type PromptPageProps = {
  dispatch: React.Dispatch<GameAction>;
};

function PromptPage({ dispatch }: PromptPageProps) {
  const [input, setInput] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [lift, setLift] = useState(false); // triggers float-up
  const [showPrompt, setShowPrompt] = useState(false);

  const dialogue = [
    "Ah, traveler, before the cards can whisper their secrets, you must whisper yours.",
    "Speak the question that burns brightest in your heart…",
    "Do not fear. Tarrochi listens, and your words will shape the path ahead.",
  ];

  const isLastLine = textIndex >= dialogue.length - 2;

  const handleNext = () => {
    if (!isLastLine) {
      setTextIndex((i) => i + 1);
    } else {
      // final press → float up, then reveal spreads with fade-in
      setLift(true);
      setTimeout(() => setShowPrompt(true), 1200);
    }
  };

  const handleSubmit = () => {
    if (!input.trim()) return;
    dispatch({ type: "SET_PROMPT", text: input });
    dispatch({ type: "BEGIN_SCENES" }); // Move to randomized scenes
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      {/* Wizard + dialogue bubble */}
      <div className={`flex items-start space-x-6 -translate-x-10 relative z-10 ${
        lift ? "animate-floatUp" : ""
        }`}>
        <div className="relative">
          <div className="absolute inset-0 blur-2xl bg-purple-500/30 rounded-full" />
          <img
            src={wizardImage}
            alt="wizard"
            className="relative w-96 h-auto flex-shrink-0 animate-floatSway"
          />
        </div>

        <div className="relative w-[560px] h-[240px] bg-indigo-800 text-white rounded-3xl p-6 shadow-2xl border border-purple-400/70">
          <div className="h-full pr-14">
            <p
              className="h-[200px] overflow-y-auto text-2xl leading-relaxed tracking-wide font-light"
              style={{ fontFamily: '"Cinzel Decorative", cursive' }}
            >
              <TypewriterText text={dialogue[textIndex]} speed={1} />
            </p>
          </div>

          {/* Tail */}
          <div className="absolute -left-3 top-10 w-0 h-0 border-t-8 border-b-8 border-r-[14px] border-t-transparent border-b-transparent border-r-indigo-800" />

          {/* Next button */}
          {!lift && (
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

      {/* Input box at bottom */}
      {showPrompt && (
        <div className="relative z-10 w-full h-50 -mt-50 max-w-2xl px-6 animate-fadeIn">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Speak your question into the ether..."
            className="w-full h-40 p-4 text-lg mt-36 rounded-2xl bg-purple-900/70 text-white border border-purple-400/60 shadow-lg resize-none focus:outline-none focus:ring-4 focus:ring-purple-400/60"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          />
          <button
            onClick={handleSubmit}
            className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold text-xl shadow-lg hover:scale-105 hover:shadow-purple-500/40 transition-transform"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default PromptPage;
