import React, { useMemo } from "react";
import { type GameAction } from "../customHooks/gameReducer";
import ruralBg from "../assets/rural.png";

type SceneProps = {
  dispatch: React.Dispatch<GameAction>;
  spread: number | null;
  idx: number;
};

function RuralScenePage({ dispatch }: SceneProps) {
  const prompts = [
    {
      text: "The countryside hums with gentle life. Where will you wander?",
      choices: [
        "Walk toward the quiet farmhouse",
        "Follow the dirt path to the fields",
        "Investigate the windmill by the stream",
        "Approach the scarecrow standing alone",
        "Sit on the wooden fence overlooking the meadow",
        "Enter the barn with its doors half-open",
        "Follow the barking of a distant dog",
        "Cross the stone bridge toward the orchard",
        "Explore the abandoned chicken coop",
        "Rest beside the flowing irrigation ditch",
      ],
    },
    {
      text: "Fields of grain whisper in the wind. Which road do you follow?",
      choices: [
        "Step into the cornfield maze",
        "Walk toward the grazing cattle",
        "Inspect the broken cart by the roadside",
        "Approach the lone tree in the distance",
        "Sit by the hay bales stacked high",
        "Follow the trail of fresh wagon tracks",
        "Peer into the well beside the barn",
        "Walk toward the smoke from a chimney",
        "Check the scarecrow’s missing hat",
        "Cross the patch of sunflowers nodding in the breeze",
      ],
    },
    {
      text: "The quiet farmstead feels timeless. What corner calls to you?",
      choices: [
        "Step into the vegetable garden rows",
        "Sit by the stream with a wooden bucket",
        "Look for footprints leading to the shed",
        "Investigate the wheelbarrow filled with tools",
        "Touch the cracked paint of the farmhouse wall",
        "Push open the creaking stable door",
        "Peek into the dovecote filled with birds",
        "Follow the sound of clucking hens",
        "Walk across the meadow toward the hills",
        "Trace the stone wall lined with moss",
      ],
    },
  ];

  // Pick one random prompt and 3 random choices
  const { prompt, choices } = useMemo(() => {
    const p = prompts[Math.floor(Math.random() * prompts.length)];
    const shuffled = [...p.choices].sort(() => 0.5 - Math.random()).slice(0, 3);
    return { prompt: p.text, choices: shuffled };
  }, []);

  const handleStart = (str: string) =>
    dispatch({ type: "NEXT_SCENE", choice: str });

  return (
    <div className="relative min-h-screen w-full overflow-hidden animate-sceneFadeIn font-pixel">
      {/* Background with subtle parallax */}
      <div
        className="fixed inset-0 bg-cover bg-center z-0 animate-caveParallax"
        style={{ backgroundImage: `url(${ruralBg})` }}
      />
      <div className="fixed inset-0 bg-green-900/50 z-0" />

      {/* Fireflies */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-lime-300 rounded-full animate-fireflyDrift animate-fireflyBlink"
            style={{
              top: `${Math.random() * 95}%`,
              left: `${Math.random() * 95}%`,
              animationDuration: `${3 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 flex flex-col items-center justify-between min-h-screen py-10">
        {/* Prompt with bounce + breathing */}
        <div className="animate-slideDownBounce">
          <div className="pixel-box px-8 py-6 max-w-3xl text-center animate-breatheSoft">
            <h2 className="text-lg text-lime-100 leading-relaxed">{prompt}</h2>
          </div>
        </div>

        {/* Choices with staggered pop + idle float */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 px-4 w-full max-w-5xl">
          {choices.map((str, i) => (
            <div
              key={i}
              className="pixel-box w-full sm:w-72 max-w-sm h-28 flex items-center justify-center text-center text-lime-100 text-sm cursor-pointer hover:scale-110 transition-transform animate-choicePop animate-cardBobIdle"
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

export default RuralScenePage;
