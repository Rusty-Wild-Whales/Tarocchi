import React, { useMemo } from "react";
import { type GameAction } from "../customHooks/gameReducer";
import castleBg from "../assets/castle.png";

type SceneProps = {
  dispatch: React.Dispatch<GameAction>;
  spread: number | null;
  idx: number;
};

function CastleScenePage({ dispatch }: SceneProps) {
  const prompts = [
    {
      text: "The castle breathes with echoes of its past. Which way do you turn?",
      choices: [
        "Enter the grand hall of banners",
        "Climb the winding stone staircase",
        "Investigate the torchlit corridor",
        "Approach the throne draped in cobwebs",
        "Examine the suits of armor lining the hall",
        "Push open the heavy door to the library",
        "Peer through the shattered stained-glass window",
        "Descend into the cold dungeon passage",
        "Search the dusty banquet table for clues",
        "Walk toward the courtyard filled with weeds",
      ],
    },
    {
      text: "Stone walls and velvet banners conceal old truths. Where do you begin?",
      choices: [
        "Inspect the cracked shield on the wall",
        "Step into the gallery of faded portraits",
        "Pull the lever half-hidden behind a tapestry",
        "Peek into the alcove with broken statues",
        "Enter the echoing chamber with pillars",
        "Walk into the pantry lined with jars",
        "Read the torn page left on the floor",
        "Examine the locked chest in the corner",
        "Follow the trail of spilled candle wax",
        "Lean against the cracked pillar for hidden switches",
      ],
    },
    {
      text: "Torches flicker as if awaiting your step. What path calls your courage?",
      choices: [
        "Step into the spiral stairwell going up",
        "Descend into the cellar with chains",
        "Walk through the arch of dragon carvings",
        "Peek into the armory with scattered weapons",
        "Push open the door to the music chamber",
        "Test the loose stones underfoot",
        "Examine the parchment nailed to the door",
        "Sit briefly on the empty throne",
        "Search beneath the tattered rug",
        "Follow the sound of rattling chains",
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
        <div className="animate-slideDownBounce">
          <div className="pixel-box px-8 py-6 max-w-3xl text-center animate-promptBreath">
            <h2 className="text-lg text-yellow-100 leading-relaxed">
              {prompt}
            </h2>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mb-8 px-4 w-full max-w-5xl">
          {choices.map((str, i) => (
            <div
              key={i}
              className="pixel-box w-full sm:w-72 max-w-sm h-28 flex items-center justify-center text-center text-yellow-100 text-sm cursor-pointer hover:scale-110 transition-transform animate-choicePop animate-choiceFloat"
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
export default CastleScenePage;
