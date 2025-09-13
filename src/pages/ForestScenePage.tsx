import React, { useMemo } from "react";
import { type GameAction } from "../customHooks/gameReducer";
import forestBg from "../assets/forest.png";

type SceneProps = {
  dispatch: React.Dispatch<GameAction>;
  spread: number | null;
  idx: number;
};

function ForestScenePage({ dispatch, spread, idx }: SceneProps) {
  const prompts = [
    {
      text: "The forest hums with hidden whispers. Which path do you choose?",
      choices: [
        "Follow the path through the ancient trees",
        "Step into the clearing bathed in moonlight",
        "Investigate the sound of rustling leaves",
        "Approach the old oak with twisted roots",
        "Cross the narrow wooden bridge over the stream",
        "Examine the strange carvings on a fallen trunk",
        "Touch the glowing mushrooms along the trail",
        "Seek the broken stone arch swallowed by vines",
        "Follow the flicker of distant lantern light",
        "Venture toward the chorus of night creatures",
      ],
    },
    {
      text: "The trees lean close, as if guarding secrets. Where will you tread?",
      choices: [
        "Inspect the hollow stump filled with moss",
        "Step into the thicket of brambles",
        "Look for animal tracks along the soil",
        "Listen to the rustle high in the canopy",
        "Follow the stream’s gentle murmur",
        "Approach the patch of wildflowers glowing faintly",
        "Circle back to the twisted roots of an ancient pine",
        "Trace the spider webs strung between branches",
        "Peer into the fog that thickens near the ridge",
        "Kneel beside the ring of mushrooms in the grass",
      ],
    },
    {
      text: "Moonlight spills across the mossy floor. Which direction calls your soul?",
      choices: [
        "Follow the silver trail of dewlit leaves",
        "Approach the stump glowing with fireflies",
        "Walk deeper toward the owl’s hoot",
        "Step into the grove of standing stones",
        "Cross the mossy log spanning a stream",
        "Touch the shimmering vines wrapped around a trunk",
        "Sit in the patch of moonlit grass to reflect",
        "Investigate the shadow cast by unseen branches",
        "Venture toward the hillside where wolves howl",
        "Pick up the feather glowing faintly on the ground",
      ],
    },
  ];

  const { prompt, choices } = useMemo(() => {
    const p = prompts[Math.floor(Math.random() * prompts.length)];
    const shuffled = [...p.choices].sort(() => 0.5 - Math.random()).slice(0, 3);
    return { prompt: p.text, choices: shuffled };
  }, []);

  const handleStart = (str: string) => {
    dispatch({ type: "NEXT_SCENE", choice: str });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden animate-sceneFadeIn font-pixel">
      <div
        className="fixed inset-0 bg-cover bg-center z-0 animate-bgParallax"
        style={{ backgroundImage: `url(${forestBg})` }}
      />
      <div className="fixed inset-0 bg-green-950/60 z-0" />

      {/* Fireflies */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-emerald-300 rounded-full animate-fireflyBlink animate-fireflyDrift"
            style={{
              top: `${Math.random() * 95}%`,
              left: `${Math.random() * 95}%`,
              animationDuration: `${3 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 flex flex-col items-center justify-between min-h-screen py-10">
        {/* Prompt */}
        <div className="animate-slideDownBounce">
          <div className="pixel-box px-8 py-6 max-w-3xl text-center animate-promptBreath">
            <h2 className="text-lg text-emerald-100 leading-relaxed">
              {prompt}
            </h2>
          </div>
        </div>

        {/* Choices */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 px-4 w-full max-w-5xl">
          {choices.map((str, i) => (
            <div
              key={i}
              className="pixel-box w-full sm:w-72 max-w-sm h-28 flex items-center justify-center text-center text-emerald-100 text-sm cursor-pointer hover:scale-110 transition-transform animate-choicePop animate-choiceFloat"
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

export default ForestScenePage;
