import React from "react";
import { type GameAction } from "../customHooks/gameReducer";
import ruralBg from "../assets/rural.png";

type SceneProps = {
  dispatch: React.Dispatch<GameAction>;
  spread: number | null;
  idx: number;
};

function RuralScenePage({ dispatch, spread, idx }: SceneProps) {
  const choices = [
    "Walk toward the quiet farmhouse",
    "Follow the dirt path to the fields",
    "Investigate the windmill by the stream",
  ];

  const handleStart = (str: string) => {
    dispatch({ type: "NEXT_SCENE", choice: str });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden animate-sceneFadeIn font-pixel">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center z-0 animate-bgParallax"
        style={{ backgroundImage: `url(${ruralBg})` }}
      />
      <div className="fixed inset-0 bg-green-900/50 z-0" />

      {/* Fireflies */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 40 }).map((_, i) => {
          const colors = ["#bef264", "#fef9c3", "#d9f99d"];
          const color = colors[Math.floor(Math.random() * colors.length)];
          return (
            <div
              key={i}
              className="absolute rounded-full animate-ruralFireflyMove animate-ruralFireflyBlink"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                top: `${Math.random() * 95}%`,
                left: `${Math.random() * 95}%`,
                background: color,
                boxShadow: `0 0 6px ${color}, 0 0 12px ${color}`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
              }}
            />
          );
        })}
      </div>

      <div className="relative z-20 flex flex-col items-center justify-between min-h-screen py-10">
        {/* Prompt */}
        <div className="animate-slideDownBounce">
          <div className="pixel-box px-8 py-6 max-w-3xl text-center animate-promptBreath">
            <h2 className="text-lg text-lime-100 leading-relaxed">
              The countryside hums with gentle life. Where will you wander?
            </h2>
          </div>
        </div>

        {/* Choices */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 px-4 w-full max-w-5xl">
          {choices.map((str, i) => (
            <div
              key={i}
              className="pixel-box w-full sm:w-72 max-w-sm h-28 flex items-center justify-center text-center text-lime-100 text-sm cursor-pointer hover:scale-110 hover:shadow-lime-400/40 transition-transform animate-choicePop animate-choiceFloat"
              style={{ animationDelay: `${i * 0.3}s` }}
              onClick={() => handleStart(str)}
            >
              {str}
            </div>
          ))}
        </div>

        <div className="absolute left-4 bottom-4 text-xs text-lime-200/70">
          Spread: {spread} | Scene: {idx}
        </div>
      </div>
    </div>
  );
}

export default RuralScenePage;
