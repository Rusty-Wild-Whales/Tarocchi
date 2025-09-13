import { useReducer } from "react";

export type GameState = {
  stage: "start" | "scene" | "result";
  spread: number | null;
  sceneIndex: number;
  choices: string[];
};

export type GameAction =
  | { type: "SET_SPREAD"; spread: number }
  | { type: "MAKE_CHOICE"; choice: string }
  | { type: "NEXT_SCENE" }
  | { type: "SET_CARDS"; cards: TarotCard[] }
  | { type: "SET_INTERPRETATION"; text: string }
  | { type: "RESET" };

const initialState: GameState = {
  stage: "start",
  spread: null,
  sceneIndex: 0,
  choices: [],
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "SET_SPREAD":
      return { ...state, spread: action.spread, stage: "scene", sceneIndex: 0 };
    default:
      return state;
  }

  return initialState;
}

export function useGameReducer() {
  return useReducer(gameReducer, initialState);
}
