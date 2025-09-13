import React from "react";
import { type GameAction } from "../customHooks/gameReducer";
import { CardContainer, CardBody, CardItem } from "../components/ui/3d-card";
import forestBg from "../assets/forest.png"; // update to your path

type ScenePageProps = {
  dispatch: React.Dispatch<any>;
  spread: number | null;
  idx: number;
};

function ScenePage({ dispatch, spread, idx }: ScenePageProps) {
  const choices = [
    "Follow the glowing fireflies deeper into the woods",
    "Listen closely to the whispering leaves",
    "Step onto the hidden mossy trail",
  ];

  // Keep your original navigation shape (no logic change)
  const handleStart = (str: string) => {
    dispatch({ type: "NEXT_SCENE", choice: str });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden animate-sceneFadeIn">
      {/* Fullscreen forest background */}
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${forestBg})` }}
      />
      {/* Dark overlay for readability */}
      <div className="fixed inset-0 bg-green-950/50 z-0" />

      {/* Fireflies across the full viewport */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              Math.random() > 0.7
                ? "animate-fireflyBlink"
                : "animate-fireflyDrift"
            }`}
            style={{
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              backgroundColor:
                Math.random() > 0.5
                  ? "rgba(255,255,150,0.9)"
                  : "rgba(150,255,150,0.85)",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-between min-h-screen w-full py-10">
        {/* Textbox near top — idle animation on a wrapper (no transform conflicts) */}
        <div className="animate-textSwaySoft">
          <div className="bg-green-900/70 text-green-100 border border-green-400/60 rounded-2xl shadow-lg px-10 py-6 max-w-3xl text-center backdrop-blur-sm animate-breatheSoft will-change-transform">
            <h2
              className="text-2xl font-semibold tracking-wide text-green-100 drop-shadow-md"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              The forest hums with unseen life. Choose your path, traveler…
            </h2>
          </div>
        </div>

        {/* Choices anchored toward the bottom */}
        <div className="flex gap-8 flex-wrap justify-center animate-fadeSlideUp mb-8">
          {choices.map((str, i) => (
            <CardContainer key={i} containerClassName="w-72 h-44">
              {/* Put idle bob on a wrapper OUTSIDE the 3D transform target */}
              <div className="animate-cardBobIdle will-change-transform">
                <CardBody
                  className="w-72 h-44 rounded-2xl border border-green-400/40 shadow-lg 
                             bg-gradient-to-br from-green-800/90 to-green-950/90 
                             relative overflow-hidden transition-all duration-300 group"
                >
                  {/* Soft internal glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-transparent opacity-70 group-hover:opacity-90 transition duration-500" />

                  {/* Raised text layer for depth */}
                  <CardItem
                    translateZ="80"
                    className="relative z-10 h-full flex items-center justify-center px-4 text-lg font-semibold text-green-100 
                               tracking-wide text-center leading-snug cursor-pointer
                               group-hover:scale-105 group-hover:text-green-50 group-hover:rotate-1 transition-transform duration-300"
                    style={{ fontFamily: '"Marcellus", serif' }}
                    onClick={() => handleStart(str)}
                  >
                    {str}
                  </CardItem>

                  {/* Edge highlight that brightens on hover */}
                  <div className="absolute inset-0 rounded-2xl border border-green-400/30 group-hover:border-green-300/70 transition duration-500" />
                </CardBody>
              </div>
            </CardContainer>
          ))}
        </div>

        {/* Optional debug */}
        <div className="absolute left-4 bottom-4 text-xs text-green-200/70">
          Spread: {spread} | Scene: {idx}
        </div>
      </div>
    </div>
  );
}

export default ScenePage;
