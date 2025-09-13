import React, { useMemo } from "react";
import { type GameAction } from "../customHooks/gameReducer";
import caveBg from "../assets/cave.png";

type SceneProps = {
  dispatch: React.Dispatch<GameAction>;
  spread: number | null;
  idx: number;
};

function CaveScenePage({ dispatch }: SceneProps) {
  const prompts = [
    {
      text: "The cave glows with hidden secrets. Which call do you answer?",
      choices: [
        "Step toward the glowing crystals",
        "Descend deeper into the cavern",
        "Trace the echoes of dripping water",
        "Approach the underground pool shimmering in the dark",
        "Examine the claw marks etched into the stone",
        "Squeeze through the narrow crack in the wall",
        "Follow the cool draft toward a hidden exit",
        "Touch the stalagmites that hum faintly",
        "Listen closely to the whispers in the dark",
        "Walk toward the faint sound of rushing water",
      ],
    },
    {
      text: "Echoes dance across stone walls. Where does your curiosity take you?",
      choices: [
        "Step carefully along the jagged stone floor",
        "Peek into the shadowed alcove",
        "Test the rope ladder leading downward",
        "Investigate the pile of shattered bones",
        "Gaze at the crystals reflecting rainbow light",
        "Knock on the hollow stalactite",
        "Listen for footsteps deeper inside",
        "Crawl into the tunnel glowing faintly",
        "Look up toward the bats stirring above",
        "Follow the echo of a distant voice",
      ],
    },
    {
      text: "Shadows and crystals share this silence. Which mystery draws you closer?",
      choices: [
        "Touch the black crystal glowing faintly red",
        "Step onto the ledge overlooking the abyss",
        "Walk toward the circle of stones in the cavern",
        "Peer into the pool with glowing fish",
        "Listen to the faint humming from the ceiling",
        "Approach the pile of glittering dust",
        "Step through the arch of stalactites",
        "Run your fingers along cold metallic veins",
        "Move toward the gust of warm air",
        "Follow the flicker of a torch left behind",
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
        style={{ backgroundImage: `url(${caveBg})` }}
      />
      <div className="fixed inset-0 bg-blue-950/60 z-0" />

      {/* Glowing crystals */}
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
        <div className="animate-slideDownBounce">
          <div className="pixel-box px-8 py-6 max-w-3xl text-center animate-promptBreath">
            <h2 className="text-lg text-cyan-100 leading-relaxed">{prompt}</h2>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mb-8 px-4 w-full max-w-5xl">
          {choices.map((str, i) => (
            <div
              key={i}
              className="pixel-box w-full sm:w-72 max-w-sm h-28 flex items-center justify-center text-center text-cyan-100 text-sm cursor-pointer hover:scale-110 transition-transform animate-choicePop animate-choiceFloat"
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
export default CaveScenePage;
