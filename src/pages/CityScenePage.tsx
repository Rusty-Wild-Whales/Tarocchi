import React, { useMemo } from "react";
import { type GameAction } from "../customHooks/gameReducer";
import cityBg from "../assets/city.png";

type SceneProps = {
  dispatch: React.Dispatch<GameAction>;
  spread: number | null;
  idx: number;
};

function CityScenePage({ dispatch }: SceneProps) {
  const prompts = [
    {
      text: "The city hums with hidden stories. Where will you go?",
      choices: [
        "Step into the bustling marketplace",
        "Climb the neon-lit tower",
        "Follow the shadowed alleyway",
        "Approach the vendor shouting riddles",
        "Cross the street toward the flickering arcade",
        "Sneak behind the glowing billboard",
        "Walk toward the rooftop garden glowing faintly",
        "Enter the smoky tavern filled with laughter",
        "Investigate the subway entrance humming with energy",
        "Chase the fleeting silhouette in the crowd",
      ],
    },
    {
      text: "Neon lights cut through shadow and smoke. What calls your step?",
      choices: [
        "Step under the buzzing neon sign",
        "Walk toward the crowded street corner",
        "Enter the elevator of a glass tower",
        "Investigate the glowing graffiti on the wall",
        "Cross the bridge with flickering lamps",
        "Approach the taxi stand filled with arguments",
        "Follow the sound of distant music",
        "Inspect the vending machine sparking faintly",
        "Slip into the diner glowing red and blue",
        "Chase the cat darting between legs",
      ],
    },
    {
      text: "In the crowd, destiny hides in plain sight. Which street do you choose?",
      choices: [
        "Step onto the tram filled with strangers",
        "Walk toward the plaza of fountains",
        "Approach the woman handing out flyers",
        "Enter the bookshop lit by a single lamp",
        "Peer into the doorway glowing violet",
        "Head toward the bridge echoing with footsteps",
        "Investigate the ringing payphone on the corner",
        "Cross to the rooftop where pigeons gather",
        "Follow the lanterns hung across the street",
        "Sit on the bench beside the street musician",
      ],
    },
  ];

  const { prompt, choices } = useMemo(() => {
    const p = prompts[Math.floor(Math.random() * prompts.length)];
    const shuffled = [...p.choices].sort(() => 0.5 - Math.random()).slice(0, 3);
    return { prompt: p.text, choices: shuffled };
  }, []);

  const handleStart = (str: string) =>
    dispatch({ type: "NEXT_SCENE", choice: str });

  return (
    <div className="relative min-h-screen w-full overflow-hidden animate-sceneFadeIn font-pixel">
      <div
        className="fixed inset-0 bg-cover bg-center z-0 animate-bgParallax"
        style={{ backgroundImage: `url(${cityBg})` }}
      />
      <div className="fixed inset-0 bg-purple-950/60 z-0" />

      {/* Neon sparks */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 100 }).map((_, i) => {
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
              {prompt}
            </h2>
          </div>
        </div>

        {/* Choices */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 px-4 w-full max-w-5xl">
          {choices.map((str, i) => (
            <div
              key={i}
              className="pixel-box w-full sm:w-72 max-w-sm h-28 flex items-center justify-center text-center text-fuchsia-100 text-sm cursor-pointer hover:scale-110 transition-transform animate-choicePop animate-choiceFloat"
              style={{ animationDelay: `${i * 0.3}s` }}
              onClick={() => handleStart(str)}
            >
              {str}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default CityScenePage;
