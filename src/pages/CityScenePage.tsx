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
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${cityBg})` }}
      />
      <div className="fixed inset-0 bg-purple-950/60 z-0" />

      {/* Floating neon sparks */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-fuchsia-400 rounded-full animate-pulse-soft"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 flex flex-col items-center justify-between min-h-screen py-10">
        {/* Scene prompt */}
        <div className="animate-slideDownBounce">
          <div className="pixel-box px-8 py-6 max-w-3xl text-center">
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
              className="pixel-box w-full sm:w-72 max-w-sm h-28 flex items-center justify-center text-center text-fuchsia-100 text-sm cursor-pointer hover:scale-105 transition-transform animate-choicePop"
              style={{ animationDelay: `${i * 0.2}s` }}
              onClick={() => handleStart(str)}
            >
              {str}
            </div>
          ))}
        </div>

        {/* Debug info */}
        <div className="absolute left-4 bottom-4 text-xs text-fuchsia-200/70">
          Spread: {spread} | Scene: {idx}
        </div>
      </div>
    </div>
  );
}

export default CityScenePage;
