import Clock from "./components/Clock";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <div className="title">Synchronized Clocks</div>
      <div className="clocks-container">
        <Clock clockType="analog" className="clock" />
        <Clock clockType="digital" className="clock" />
      </div>
    </div>
  );
}

export default App;
