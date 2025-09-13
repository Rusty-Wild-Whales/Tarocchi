import React from "react";
import { type GameAction } from "../customHooks/gameReducer";
import caveBg from "../assets/cave.png";

type SceneProps = {
  dispatch: React.Dispatch<GameAction>;
  spread: number | null;
  idx: number;
};

function CaveScenePage({ dispatch, spread, idx }: SceneProps) {
  const choices = [
    "Step toward the glowing crystals",
    "Descend deeper into the cavern",
    "Trace the echoes of dripping water",
  ];

  const handleStart = (str: string) => {
    dispatch({ type: "NEXT_SCENE", choice: str });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden animate-sceneFadeIn font-pixel">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center z-0 animate-bgParallax"
        style={{ backgroundImage: `url(${caveBg})` }}
      />
      <div className="fixed inset-0 bg-blue-950/60 z-0" />

      {/* Crystals */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 40 }).map((_, i) => {
          const colors = ["#06b6d4", "#3b82f6", "#a855f7", "#22d3ee"];
          const color = colors[Math.floor(Math.random() * colors.length)];
          return (
            <div
              key={i}
              className="absolute w-3.5 h-3.5 animate-crystalGlow"
              style={{
                top: `${Math.random() * 95}%`,
                left: `${Math.random() * 95}%`,
                animationDelay: `${Math.random() * 3}s`,
                color: color,
                background: `linear-gradient(135deg, ${color}, white)`,
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              }}
            />
          );
        })}
      </div>

      <div className="relative z-20 flex flex-col items-center justify-between min-h-screen py-10">
        {/* Scene prompt */}
        <div className="animate-slideDownBounce">
          <div className="pixel-box px-8 py-6 max-w-3xl text-center animate-promptBreath">
            <h2 className="text-lg text-cyan-100 leading-relaxed">
              The cave glows with hidden secrets. Which call do you answer?
            </h2>
          </div>
        </div>

        {/* Choices */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 px-4 w-full max-w-5xl">
          {choices.map((str, i) => (
            <div
              key={i}
              className="pixel-box w-full sm:w-72 max-w-sm h-28 flex items-center justify-center text-center text-cyan-100 text-sm cursor-pointer hover:scale-110 hover:shadow-cyan-400/40 transition-transform animate-choicePop animate-choiceFloat"
              style={{ animationDelay: `${i * 0.3}s` }}
              onClick={() => handleStart(str)}
            >
              {str}
            </div>
          ))}
        </div>

        <div className="absolute left-4 bottom-4 text-xs text-cyan-200/70">
          Spread: {spread} | Scene: {idx}
        </div>
      </div>
    </div>
  );
}

export default CaveScenePage;
