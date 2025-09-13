import { useReducer } from "react";

export type GameState = {
  stage: "land" | "spread" | "scene" | "result";
  spread: number;
  sceneIndex: number;
  choices: string[];
};

export type GameAction =
  | { type: "LANDING" }
  | { type: "SET_SPREAD"; spread: number }
  | { type: "NEXT_SCENE"; choice: string }
  // | { type: "SET_CARDS"; cards: TarotCard[] }
  | { type: "SET_INTERPRETATION"; text: string }
  | { type: "RESULT" };

const initialState: GameState = {
  stage: "land",
  spread: 0,
  sceneIndex: 0,
  choices: [],
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "LANDING":
      return { ...state, stage: "spread" };
    case "SET_SPREAD":
      return { ...state, spread: action.spread, stage: "scene" };
    case "NEXT_SCENE":
      console.log(state)
      state = {...state, choices: [...state.choices, action.choice]}
      if (state.sceneIndex < state.spread + 1) {
        return { ...state, sceneIndex: state.sceneIndex + 1 };
      } else {
        return { ...state, stage: "result" };
      }
    default:
      return state;
  }

  return initialState;
}

export function useGameReducer() {
  return useReducer(gameReducer, initialState);
}
