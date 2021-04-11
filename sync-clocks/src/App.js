import Clock from "./components/Clock";
import React, { useState } from "react";
import moment from "moment";
import "./App.scss";

function App() {
  const [currentTime, setTime] = useState(moment());

  return (
    <div className="App">
      <div className="title">Synchronized Clocks</div>
      <div className="clocks-container">
        <Clock
          clockType="analog"
          className="clock"
          time={currentTime}
          setTime={setTime}
        />
        <Clock
          clockType="digital"
          className="clock"
          time={currentTime}
          setTime={setTime}
        />
      </div>
    </div>
  );
}

export default App;
