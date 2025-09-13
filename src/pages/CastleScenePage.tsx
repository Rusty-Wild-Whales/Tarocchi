// CastleScenePage.tsx
import React from "react";
import { type GameAction } from "../customHooks/gameReducer";
import { CardContainer, CardBody, CardItem } from "../components/ui/3d-card";
import castleBg from "../assets/castle.png"; // add your art

type SceneProps = {
  dispatch: React.Dispatch<GameAction>;
  spread: number | null;
  idx: number;
};

function CastleScenePage({ dispatch, spread, idx }: SceneProps) {
  const choices = [
    "Enter the grand hall of banners",
    "Climb the winding stone staircase",
    "Investigate the torchlit corridor",
  ];

  const handleStart = (str: string) => {
    dispatch({ type: "NEXT_SCENE", choice: str });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden animate-sceneFadeIn">
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${castleBg})` }}
      />
      <div className="fixed inset-0 bg-indigo-950/50 z-0" />

      {/* Flickering torches */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-6 bg-orange-400/70 rounded-full animate-blink"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${1 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 flex flex-col items-center justify-between min-h-screen py-10">
        <div className="animate-textSwaySoft">
          <div className="bg-indigo-900/70 text-yellow-100 border border-yellow-400/60 rounded-2xl shadow-lg px-10 py-6 max-w-3xl text-center backdrop-blur-sm animate-breatheSoft">
            <h2
              className="text-2xl font-semibold tracking-wide text-yellow-100 drop-shadow-md"
              style={{ fontFamily: '"Cinzel", serif' }}
            >
              The castle breathes with echoes of its past. Which way do you
              turn?
            </h2>
          </div>
        </div>

        <div className="flex gap-8 flex-wrap justify-center animate-fadeSlideUp mb-8">
          {choices.map((str, i) => (
            <CardContainer key={i} containerClassName="w-72 h-44">
              <div className="animate-cardBobIdle">
                <CardBody className="w-72 h-44 rounded-2xl border border-yellow-400/40 shadow-lg bg-gradient-to-br from-indigo-800/90 to-indigo-950/90 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-transparent opacity-70 group-hover:opacity-90 transition" />
                  <CardItem
                    translateZ="80"
                    className="relative z-10 h-full flex items-center justify-center px-4 text-lg font-semibold text-yellow-100 text-center cursor-pointer group-hover:scale-105 transition-transform"
                    style={{ fontFamily: '"Marcellus", serif' }}
                    onClick={() => handleStart(str)}
                  >
                    {str}
                  </CardItem>
                  <div className="absolute inset-0 rounded-2xl border border-yellow-400/30 group-hover:border-yellow-300/70 transition" />
                </CardBody>
              </div>
            </CardContainer>
          ))}
        </div>

        <div className="absolute left-4 bottom-4 text-xs text-yellow-200/70">
          Spread: {spread} | Scene: {idx}
        </div>
      </div>
    </div>
  );
}

export default CastleScenePage;
