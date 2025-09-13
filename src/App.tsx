import "./App.css";
import { type GameState, useGameReducer } from "./customHooks/gameReducer.ts";
import StartPage from "./pages/StartPage.tsx";
import ScenePage from "./pages/ScenePage.tsx";
import ResultPage from "./pages/ResultPage.tsx";

function App() {
  const [state, dispatch] = useGameReducer();

  switch (state.stage) {
    case "start":
      return <StartPage dispatch={dispatch} />;
    case "scene":
      return <ScenePage dispatch={dispatch} />;
    case "start":
      return <ResultPage dispatch={dispatch} />;
    default:
      return null;
  }
}

export default App;
