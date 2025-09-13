import React from "react";
import { type GameAction } from "../customHooks/gameReducer";
import cityBg from "../assets/city.png";

type SceneProps = {
  dispatch: React.Dispatch<GameAction>;
  spread: number | null;
  idx: number;
};

function CityScenePage({ dispatch, spread, idx }: SceneProps) {
  const choices = [
    "Step into the bustling marketplace",
    "Climb the neon-lit tower",
    "Follow the shadowed alleyway",
  ];

  const handleStart = (str: string) => {
    dispatch({ type: "NEXT_SCENE", choice: str });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden animate-sceneFadeIn font-pixel">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center z-0 animate-bgParallax"
        style={{ backgroundImage: `url(${cityBg})` }}
      />
      <div className="fixed inset-0 bg-purple-950/60 z-0" />

      {/* Neon sparks */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 80 }).map((_, i) => {
          const colors = ["#f0abfc", "#a78bfa", "#f472b6"];
          const color = colors[Math.floor(Math.random() * colors.length)];
          return (
            <div
              key={i}
              className="absolute rounded-full animate-neonFlicker animate-neonDrift"
              style={{
                width: `${Math.random() * 3 + 2}px`,
                height: `${Math.random() * 3 + 2}px`,
                top: `${Math.random() * 95}%`,
                left: `${Math.random() * 95}%`,
                color: color,
                background: color,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 6}s`,
              }}
            />
          );
        })}
      </div>

      <div className="relative z-20 flex flex-col items-center justify-between min-h-screen py-10">
        {/* Prompt */}
        <div className="animate-slideDownBounce">
          <div className="pixel-box px-8 py-6 max-w-3xl text-center animate-promptBreath">
            <h2 className="text-lg text-fuchsia-100 leading-relaxed">
              The city hums with hidden stories. Where will you go?
            </h2>
          </div>
        </div>

        {/* Choices */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 px-4 w-full max-w-5xl">
          {choices.map((str, i) => (
            <div
              key={i}
              className="pixel-box w-full sm:w-72 max-w-sm h-28 flex items-center justify-center text-center text-fuchsia-100 text-sm cursor-pointer hover:scale-110 hover:shadow-fuchsia-400/40 transition-transform animate-choicePop animate-choiceFloat"
              style={{ animationDelay: `${i * 0.3}s` }}
              onClick={() => handleStart(str)}
            >
              {str}
            </div>
          ))}
        </div>

        <div className="absolute left-4 bottom-4 text-xs text-fuchsia-200/70">
          Spread: {spread} | Scene: {idx}
        </div>
      </div>
    </div>
  );
}

export default CityScenePage;
