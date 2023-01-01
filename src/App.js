import logo from "./logo.svg";
import "./App.css";
import WeatherPage from "./Components/WeatherPage/WeatherPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="headerText">Today's Weather</div>
      </header>
      <div>
        <WeatherPage />
      </div>
    </div>
  );
}

export default App;
