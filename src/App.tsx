import "./App.css";
import { type GameState, useGameReducer } from "./customHooks/gameReducer.ts";
import StartPage from "./pages/StartPage";
import SelectPage from "./pages/SelectPage";
import ScenePage from "./pages/ScenePage";
import ResultPage from "./pages/ResultPage";

function App() {
  const [state, dispatch] = useGameReducer();

  switch (state.stage) {
    case "land":
      return <StartPage dispatch={dispatch} />;
    case "spread":
      return <SelectPage dispatch={dispatch} />;
    case "scene":
      return <ScenePage dispatch={dispatch} spread={state.spread} idx={state.sceneIndex} />;
    case "result":
      return <ResultPage dispatch={dispatch} />;
    default:
      return null;
  }
}

export default App;
