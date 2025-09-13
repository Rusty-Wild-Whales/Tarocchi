// RuralScenePage.tsx
import React from "react";
import { type GameAction } from "../customHooks/gameReducer";
import { CardContainer, CardBody, CardItem } from "../components/ui/3d-card";
import ruralBg from "../assets/rural.png";

type SceneProps = {
  dispatch: React.Dispatch<GameAction>;
  spread: number | null;
  idx: number;
};

function RuralScenePage({ dispatch, spread, idx }: SceneProps) {
  const choices = [
    "Walk down the dirt path",
    "Rest beneath the old oak tree",
    "Follow the sound of flowing water",
  ];

  const handleStart = (str: string) => {
    dispatch({ type: "NEXT_SCENE", choice: str });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden animate-sceneFadeIn">
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${ruralBg})` }}
      />
      <div className="fixed inset-0 bg-yellow-900/40 z-0" />

      {/* Floating seeds */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/70 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 flex flex-col items-center justify-between min-h-screen py-10">
        <div className="animate-textSwaySoft">
          <div className="bg-yellow-700/60 text-amber-50 border border-amber-300/60 rounded-2xl shadow-lg px-10 py-6 max-w-3xl text-center backdrop-blur-sm animate-breatheSoft">
            <h2
              className="text-2xl font-semibold tracking-wide"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              The countryside stretches open and warm. What calls to you?
            </h2>
          </div>
        </div>

        <div className="flex gap-8 flex-wrap justify-center animate-fadeSlideUp mb-8">
          {choices.map((str, i) => (
            <CardContainer key={i} containerClassName="w-72 h-44">
              <div className="animate-cardBobIdle">
                <CardBody className="w-72 h-44 rounded-2xl border border-amber-400/40 shadow-lg bg-gradient-to-br from-yellow-700/90 to-yellow-900/90 relative overflow-hidden group">
                  <CardItem
                    translateZ="80"
                    className="relative z-10 h-full flex items-center justify-center px-4 text-lg font-semibold text-amber-100 text-center cursor-pointer group-hover:scale-105 transition-transform"
                    style={{ fontFamily: '"Marcellus", serif' }}
                    onClick={() => handleStart(str)}
                  >
                    {str}
                  </CardItem>
                  <div className="absolute inset-0 rounded-2xl border border-amber-400/30 group-hover:border-amber-300/70 transition" />
                </CardBody>
              </div>
            </CardContainer>
          ))}
        </div>

        <div className="absolute left-4 bottom-4 text-xs text-amber-200/70">
          Spread: {spread} | Scene: {idx}
        </div>
      </div>
    </div>
  );
}

export default RuralScenePage;
