import React, { useEffect, useState } from "react";
import { type GameAction } from "../customHooks/gameReducer";
import wizardImage from "../assets/wizard.png";
import { TypewriterText } from "../components/TypeWriter";
import { CardContainer, CardBody, CardItem } from "../components/ui/3d-card";

type ResultPageProps = {
  dispatch: React.Dispatch<GameAction>;
  choices: string;
  prompt?: string;
  spread: number; // ✅ add spread
};

// Import all tarot images dynamically
const tarotCardsImages = import.meta.glob(
  "../assets/PixelTarot/TarotCards2x/*.png",
  { eager: true }
);
const tarotCardsArray = Object.values(tarotCardsImages).map(
  (mod) => (mod as { default: string }).default
);

function ResultPage({ dispatch, choices, prompt, spread }: ResultPageProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [lift, setLift] = useState(false);
  const [cards, setCards] = useState<string[]>([]);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const dialogue = [
    "At last, traveler… the cards have spoken.",
    "Their wisdom is not always clear, but it is always true.",
    "Behold the symbols fate has chosen for you.",
  ];

  useEffect(() => {
    let count = 3;
    if (spread === 2) count = 4;
    if (spread === 3) count = 5;

    const shuffled = [...tarotCardsArray].sort(() => Math.random() - 0.5);
    setCards(shuffled.slice(0, count));
  }, [spread]);

  const isLastLine = textIndex >= dialogue.length - 1;

  const handleNext = () => {
    if (!isLastLine) {
      setTextIndex((i) => i + 1);
    } else {
      setLift(true);
      setTimeout(() => setShowResults(true), 1500);
    }
  };

  const handleSkip = () => {
    setTextIndex(dialogue.length - 1);
    setLift(true);
    setTimeout(() => setShowResults(true), 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Wizard + dialogue bubble */}
      <div
        className={`flex items-start gap-6 -translate-x-10 relative z-10 ${
          lift ? "animate-floatUpFadeOut" : ""
        }`}
      >
        {/* Wizard */}
        <div className="relative">
          <div className="absolute inset-0 blur-2xl bg-purple-500/30 rounded-full" />
          <img
            src={wizardImage}
            alt="wizard"
            className="relative w-96 h-auto flex-shrink-0 animate-floatSway cursor-pointer"
          />
        </div>

        {/* Dialogue bubble */}
        <div className="relative w-[560px] h-[240px] bg-indigo-800 text-white rounded-3xl p-6 shadow-2xl border border-purple-400/70">
          <div className="h-full pr-14">
            <p
              className="h-[200px] overflow-y-auto text-2xl leading-relaxed tracking-wide font-light"
              style={{ fontFamily: '"Cinzel Decorative", cursive' }}
            >
              <TypewriterText text={dialogue[textIndex]} speed={1} />
            </p>
          </div>

          {/* Tail */}
          <div className="absolute -left-3 top-10 w-0 h-0 border-t-8 border-b-8 border-r-[14px] border-t-transparent border-b-transparent border-r-indigo-800" />

          {/* Next button */}
          {!lift && (
            <button
              onClick={handleNext}
              aria-label="Next"
              className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-purple-600 text-white shadow-lg
                 transition transform duration-150 ease-out
                 hover:bg-purple-700 hover:scale-110
                 active:scale-90 active:bg-purple-800
                 focus:outline-none focus:ring-4 focus:ring-purple-400/60
                 animate-pulse-soft"
            >
              →
            </button>
          )}

          {/* Skip button */}
          {!lift && (
            <button
              onClick={handleSkip}
              className="absolute top-2 right-2 px-3 py-1 text-sm rounded-md bg-purple-700/80 text-white hover:bg-purple-800 transition"
            >
              Skip
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {showResults && (
        <div className="mt-6 flex flex-col items-center space-y-10 animate-centerRiseUp">
          {prompt && (
            <div className="bg-purple-900/70 text-white px-10 py-6 rounded-xl shadow-lg max-w-2xl mb-6">
              <p className="text-lg italic">Your question:</p>
              <p className="mt-2 text-xl">{prompt}</p>
            </div>
          )}

          {/* Tarot cards */}
          <div className="flex justify-center items-center">
            {spread === 1 && (
              <div className="flex gap-8">
                {cards.map((src, idx) => (
                  <CardContainer key={idx} containerClassName="w-60 h-96">
                    <CardBody className="w-60 h-96 bg-transparent p-0 m-0">
                      <CardItem
                        translateZ="160"
                        className="w-full h-full flex items-center justify-center cardHoverStrong cursor-pointer"
                        onClick={() => setActiveCard(src)}
                      >
                        <img
                          src={src}
                          alt={`Tarot card ${idx + 1}`}
                          className="h-full w-auto object-contain"
                        />
                      </CardItem>
                    </CardBody>
                  </CardContainer>
                ))}
              </div>
            )}

            {spread === 2 && (
              <div className="grid grid-cols-3 grid-rows-3 gap-6">
                {/* Top */}
                <div className="col-start-2 row-start-1 flex justify-center">
                  <CardContainer containerClassName="w-52 h-80">
                    <CardBody className="w-52 h-80 bg-transparent">
                      <CardItem
                        translateZ="160"
                        className="w-full h-full flex items-center justify-center cardHoverStrong cursor-pointer"
                        onClick={() => setActiveCard(cards[0])}
                      >
                        <img
                          src={cards[0]}
                          alt="Top"
                          className="h-full w-auto object-contain"
                        />
                      </CardItem>
                    </CardBody>
                  </CardContainer>
                </div>

                {/* Left */}
                <div className="col-start-1 row-start-2 flex justify-center">
                  <CardContainer containerClassName="w-52 h-80">
                    <CardBody className="w-52 h-80 bg-transparent">
                      <CardItem
                        translateZ="160"
                        className="w-full h-full flex items-center justify-center cardHoverStrong cursor-pointer"
                        onClick={() => setActiveCard(cards[1])}
                      >
                        <img
                          src={cards[1]}
                          alt="Left"
                          className="h-full w-auto object-contain"
                        />
                      </CardItem>
                    </CardBody>
                  </CardContainer>
                </div>

                {/* Right */}
                <div className="col-start-3 row-start-2 flex justify-center">
                  <CardContainer containerClassName="w-52 h-80">
                    <CardBody className="w-52 h-80 bg-transparent">
                      <CardItem
                        translateZ="160"
                        className="w-full h-full flex items-center justify-center cardHoverStrong cursor-pointer"
                        onClick={() => setActiveCard(cards[2])}
                      >
                        <img
                          src={cards[2]}
                          alt="Right"
                          className="h-full w-auto object-contain"
                        />
                      </CardItem>
                    </CardBody>
                  </CardContainer>
                </div>

                {/* Bottom */}
                <div className="col-start-2 row-start-3 flex justify-center">
                  <CardContainer containerClassName="w-52 h-80">
                    <CardBody className="w-52 h-80 bg-transparent">
                      <CardItem
                        translateZ="160"
                        className="w-full h-full flex items-center justify-center cardHoverStrong cursor-pointer"
                        onClick={() => setActiveCard(cards[3])}
                      >
                        <img
                          src={cards[3]}
                          alt="Bottom"
                          className="h-full w-auto object-contain"
                        />
                      </CardItem>
                    </CardBody>
                  </CardContainer>
                </div>
              </div>
            )}

            {/* V spread (true V shape) */}
            {spread === 3 && (
              <div className="w-full">
                <div className="grid grid-cols-12 gap-y-8 w-full max-w-screen-2xl mx-auto px-4">
                  {/* Top row: far left & far right */}
                  <div className="col-start-2 col-span-2 justify-self-start">
                    <CardContainer containerClassName="w-52 h-80">
                      <CardBody className="w-52 h-80 bg-transparent">
                        <CardItem
                          translateZ="160"
                          className="w-full h-full flex items-center justify-center cardHoverStrong cursor-pointer"
                          onClick={() => setActiveCard(cards[0])}
                        >
                          <img
                            src={cards[0]}
                            alt=""
                            className="h-full w-auto object-contain"
                          />
                        </CardItem>
                      </CardBody>
                    </CardContainer>
                  </div>

                  <div className="col-start-10 col-span-2 justify-self-end">
                    <CardContainer containerClassName="w-52 h-80">
                      <CardBody className="w-52 h-80 bg-transparent">
                        <CardItem
                          translateZ="160"
                          className="w-full h-full flex items-center justify-center cardHoverStrong cursor-pointer"
                          onClick={() => setActiveCard(cards[3])}
                        >
                          <img
                            src={cards[3]}
                            alt=""
                            className="h-full w-auto object-contain"
                          />
                        </CardItem>
                      </CardBody>
                    </CardContainer>
                  </div>

                  {/* Middle row: nearer the center */}
                  <div className="col-start-4 col-span-2 justify-self-center">
                    <CardContainer containerClassName="w-52 h-80">
                      <CardBody className="w-52 h-80 bg-transparent">
                        <CardItem
                          translateZ="160"
                          className="w-full h-full flex items-center justify-center cardHoverStrong cursor-pointer"
                          onClick={() => setActiveCard(cards[1])}
                        >
                          <img
                            src={cards[1]}
                            alt=""
                            className="h-full w-auto object-contain"
                          />
                        </CardItem>
                      </CardBody>
                    </CardContainer>
                  </div>

                  <div className="col-start-8 col-span-2 justify-self-center">
                    <CardContainer containerClassName="w-52 h-80">
                      <CardBody className="w-52 h-80 bg-transparent">
                        <CardItem
                          translateZ="160"
                          className="w-full h-full flex items-center justify-center cardHoverStrong cursor-pointer"
                          onClick={() => setActiveCard(cards[4])}
                        >
                          <img
                            src={cards[4]}
                            alt=""
                            className="h-full w-auto object-contain"
                          />
                        </CardItem>
                      </CardBody>
                    </CardContainer>
                  </div>

                  {/* Bottom row: centered */}
                  <div className="col-start-6 col-span-2 justify-self-center">
                    <CardContainer containerClassName="w-52 h-80">
                      <CardBody className="w-52 h-80 bg-transparent">
                        <CardItem
                          translateZ="160"
                          className="w-full h-full flex items-center justify-center cardHoverStrong cursor-pointer"
                          onClick={() => setActiveCard(cards[2])}
                        >
                          <img
                            src={cards[2]}
                            alt=""
                            className="h-full w-auto object-contain"
                          />
                        </CardItem>
                      </CardBody>
                    </CardContainer>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Interpretation */}
          <div className="bg-indigo-900/70 text-white px-10 py-8 rounded-2xl shadow-lg max-w-3xl text-center backdrop-blur-sm">
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Interpretation
            </h2>
            <p className="text-lg leading-relaxed">
              The meaning of your cards will appear here… (placeholder text).
            </p>
          </div>
        </div>
      )}

      {activeCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
          onClick={() => setActiveCard(null)}
        >
          <div
            className="w-[85%] max-w-6xl h-[65%] flex animate-modalFadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: Card (1/3), flush left */}
            <div className="w-1/3 flex items-center justify-start">
              <img
                src={activeCard}
                alt="Active Tarot Card"
                className="h-[90%] object-contain"
              />
            </div>

            {/* Right: Text (2/3), flush right with slight background */}
            <div className="w-2/3 flex flex-col justify-center items-end pl-8">
              <div className="bg-indigo-900/70 px-8 py-6 rounded-xl shadow-lg max-w-full text-white">
                <h2
                  className="text-2xl font-bold mb-4 text-left"
                  style={{ fontFamily: '"Cinzel Decorative", cursive' }}
                >
                  Card Interpretation
                </h2>
                <p className="text-base leading-relaxed text-justify opacity-90">
                  Placeholder meaning of the card. This is where the mystical
                  insights about this specific tarot card will be displayed. The
                  text is neatly justified for readability and sits inside a
                  soft background panel to keep it clear without overwhelming
                  the screen.
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setActiveCard(null)}
                    className="mt-6 px-5 py-2 rounded-md bg-purple-700 hover:bg-purple-800 transition text-sm font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultPage;
