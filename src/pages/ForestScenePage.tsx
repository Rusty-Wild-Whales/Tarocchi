import React from "react";
import { type GameAction } from "../customHooks/gameReducer";
import forestBg from "../assets/forest.png";

type SceneProps = {
  dispatch: React.Dispatch<GameAction>;
  spread: number | null;
  idx: number;
};

function ForestScenePage({ dispatch, spread, idx }: SceneProps) {
  const choices = [
    "Follow the path through the ancient trees",
    "Step into the clearing bathed in moonlight",
    "Investigate the sound of rustling leaves",
  ];

  const handleStart = (str: string) => {
    dispatch({ type: "NEXT_SCENE", choice: str });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden animate-sceneFadeIn font-pixel">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center z-0 animate-bgParallax"
        style={{ backgroundImage: `url(${forestBg})` }}
      />
      <div className="fixed inset-0 bg-green-950/60 z-0" />

      {/* Fireflies */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-emerald-300 animate-fireflyDrift animate-fireflyBlink"
            style={{
              top: `${Math.random() * 95}%`,
              left: `${Math.random() * 95}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 flex flex-col items-center justify-between min-h-screen py-10">
        {/* Scene prompt */}
        <div className="animate-slideDownBounce">
          <div className="pixel-box px-8 py-6 max-w-3xl text-center animate-promptBreath">
            <h2 className="text-lg text-emerald-100 leading-relaxed">
              The forest hums with hidden whispers. Which path do you choose?
            </h2>
          </div>
        </div>

        {/* Choices */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 px-4 w-full max-w-5xl">
          {choices.map((str, i) => (
            <div
              key={i}
              className="pixel-box w-full sm:w-72 max-w-sm h-28 flex items-center justify-center text-center text-emerald-100 text-sm cursor-pointer hover:scale-110 hover:shadow-emerald-400/40 transition-transform animate-choicePop animate-choiceFloat"
              style={{ animationDelay: `${i * 0.3}s` }}
              onClick={() => handleStart(str)}
            >
              {str}
            </div>
          ))}
        </div>

        {/* Debug info */}
        <div className="absolute left-4 bottom-4 text-xs text-emerald-200/70">
          Spread: {spread} | Scene: {idx}
        </div>
      </div>
    </div>
  );
}

export default ForestScenePage;
