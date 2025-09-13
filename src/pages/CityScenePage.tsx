// CityScenePage.tsx
import React from "react";
import { type GameAction } from "../customHooks/gameReducer";
import { CardContainer, CardBody, CardItem } from "../components/ui/3d-card";
import cityBg from "../assets/city.png";

type SceneProps = {
  dispatch: React.Dispatch<GameAction>;
  spread: number | null;
  idx: number;
};

function CityScenePage({ dispatch, spread, idx }: SceneProps) {
  const choices = [
    "Follow the neon glow of an alley",
    "Climb to the rooftop above the streets",
    "Walk toward the bustling marketplace",
  ];

  const handleStart = (str: string) => {
    dispatch({ type: "NEXT_SCENE", choice: str });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden animate-sceneFadeIn">
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${cityBg})` }}
      />
      <div className="fixed inset-0 bg-purple-950/60 z-0" />

      {/* Flickering neon lights */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-pink-500 animate-blink"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${0.5 + Math.random() * 1.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 flex flex-col items-center justify-between min-h-screen py-10">
        <div className="animate-textSwaySoft">
          <div className="bg-purple-900/70 text-pink-100 border border-pink-400/60 rounded-2xl shadow-lg px-10 py-6 max-w-3xl text-center backdrop-blur-sm animate-breatheSoft">
            <h2
              className="text-2xl font-semibold tracking-wide"
              style={{ fontFamily: '"Cinzel Decorative", cursive' }}
            >
              The city hums with neon dreams. Where will you wander?
            </h2>
          </div>
        </div>

        <div className="flex gap-8 flex-wrap justify-center animate-fadeSlideUp mb-8">
          {choices.map((str, i) => (
            <CardContainer key={i} containerClassName="w-72 h-44">
              <div className="animate-cardBobIdle">
                <CardBody className="w-72 h-44 rounded-2xl border border-pink-400/40 shadow-lg bg-gradient-to-br from-purple-800/90 to-purple-950/90 relative overflow-hidden group">
                  <CardItem
                    translateZ="80"
                    className="relative z-10 h-full flex items-center justify-center px-4 text-lg font-semibold text-pink-100 text-center cursor-pointer group-hover:scale-105 transition-transform"
                    style={{ fontFamily: '"Marcellus", serif' }}
                    onClick={() => handleStart(str)}
                  >
                    {str}
                  </CardItem>
                  <div className="absolute inset-0 rounded-2xl border border-pink-400/30 group-hover:border-pink-300/70 transition" />
                </CardBody>
              </div>
            </CardContainer>
          ))}
        </div>

        <div className="absolute left-4 bottom-4 text-xs text-pink-200/70">
          Spread: {spread} | Scene: {idx}
        </div>
      </div>
    </div>
  );
}

export default CityScenePage;
