import "./App.css";
import { type GameState, useGameReducer } from "./customHooks/gameReducer.ts";
import StartPage from "./pages/StartPage";
import SelectPage from "./pages/SelectPage";
import ForestScenePage from "./pages/ForestScenePage.tsx";
import ResultPage from "./pages/ResultPage";
import CastleScenePage from "./pages/CastleScenePage";
import RuralScenePage from "./pages/RuralScenePage";
import CaveScenePage from "./pages/CaveScenePage";
import CityScenePage from "./pages/CityScenePage";

const sceneComponents: Record<string, React.FC<any>> = {
  forest: ForestScenePage,
  castle: CastleScenePage,
  rural: RuralScenePage,
  cave: CaveScenePage,
  city: CityScenePage,
};

function App() {
  const [state, dispatch] = useGameReducer();

  switch (state.stage) {
    case "land":
      return <StartPage dispatch={dispatch} />;
    case "spread":
      return <SelectPage dispatch={dispatch} />;
    case "scene": {
      const sceneKey = state.sceneOrder?.[state.sceneIndex] || "forest";
      const SceneComponent = sceneComponents[sceneKey];
      return (
        <SceneComponent
          dispatch={dispatch}
          spread={state.spread}
          idx={state.sceneIndex}
        />
      );
    }
    case "result":
      return (
        <ResultPage dispatch={dispatch} choices={state.choices.toString()} />
      );
    default:
      return null;
  }
}

export default App;
