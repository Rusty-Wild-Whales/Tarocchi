import { useReducer } from "react";

export type GameState = {
  stage: "land" | "spread" | "scene" | "result";
  spread: number | null;
  sceneIndex: number;
  choices: string[];
};

export type GameAction =
  | { type: "LANDING" }
  | { type: "SET_SPREAD"; spread: number }
  | { type: "MAKE_CHOICE"; choice: string }
  | { type: "NEXT_SCENE" }
  | { type: "SET_CARDS"; cards: TarotCard[] }
  | { type: "SET_INTERPRETATION"; text: string }
  | { type: "RESULT" };

const initialState: GameState = {
  stage: "land",
  spread: null,
  sceneIndex: 0,
  choices: [],
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "LANDING":
      return { ...state, stage: "spread" };
    case "SET_SPREAD":
      return { ...state, spread: action.spread, stage: "scene" };
    case "MAKE_CHOICE":
      return { ...state, stage: "scene", sceneIndex: 0 };
    default:
      return state;
  }

  return initialState;
}

export function useGameReducer() {
  return useReducer(gameReducer, initialState);
}
