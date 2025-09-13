import { useReducer } from "react";

export type GameState = {
  sceneOrder: any;
  stage: "land" | "spread" | "prompt" | "scene" | "result";
  spread: 1 | 2 | 3;
  sceneIndex: number;
  choices: string[];
  prompt?: string;
};

export type GameAction =
  | { type: "LANDING" }
  | { type: "SET_SPREAD"; spread: 1 | 2 | 3 }
  | { type: "SET_PROMPT"; text: string }
  | { type: "NEXT_SCENE"; choice: string }
  | { type: "BEGIN_SCENES" }
  // | { type: "SET_CARDS"; cards: TarotCard[] }
  | { type: "SET_INTERPRETATION"; text: string }
  | { type: "RESULT" };

const initialState: GameState = {
  stage: "land",
  spread: 1,
  sceneIndex: 0,
  choices: [],
  sceneOrder: undefined,
};

const allScenes = ["forest", "castle", "rural", "cave", "city"];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getSceneOrder(spread: 1 | 2 | 3): string[] {
  switch (spread) {
    case 1:
      return shuffle(allScenes).slice(0, 3); // three-card
    case 2:
      return shuffle(allScenes).slice(0, 4); // compass
    case 3:
      return shuffle(allScenes).slice(0, 5); // v spread
  }
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "LANDING":
      return { ...state, stage: "spread" };

    case "SET_SPREAD": {
      const order = getSceneOrder(action.spread);
      return {
        ...state,
        spread: action.spread,
        stage: "prompt",
        sceneIndex: 0,
        sceneOrder: order,
        choices: [],
      };
    }

    case "SET_PROMPT":
      return { ...state, prompt: action.text };
    case "BEGIN_SCENES": {
      const order = getSceneOrder(state.spread);
      return {
        ...state,
        stage: "scene",
        sceneOrder: order,
        sceneIndex: 0,
        choices: [],
      };
    }

    case "NEXT_SCENE": {
      const newChoices = [...state.choices, action.choice];
      const nextIndex = state.sceneIndex + 1;

      if (nextIndex >= (state.sceneOrder?.length || 0)) {
        return { ...state, stage: "result", choices: newChoices };
      }
      return { ...state, sceneIndex: nextIndex, choices: newChoices };
    }

    default:
      return state;
  }
  return initialState;
}

export function useGameReducer() {
  return useReducer(gameReducer, initialState);
}
