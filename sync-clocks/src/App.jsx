import Clock from "./components/Clock";
import React, { useEffect, useReducer } from "react";
import moment from "moment";
import "./App.scss";

const App = (props) => {
  const [time, dispatch] = useReducer((state = moment(), action) => {
    if (action.type === "sub") {
      return moment(state).subtract(1, "second");
    }
    if (action.type === "update") {
      return moment(action.payload);
    }
    if (action.type === "tick") {
      return moment(state).add(1, "second");
    }
    return moment(state);
  });

  useEffect(() => {
    const intervalHandle = setInterval(() => {
      dispatch({ type: "tick" });
      // setTime(moment());
    }, 1000);

    return () => clearInterval(intervalHandle);
  }, []);

  const moveForward = () => {
    dispatch({ type: "tick" });
  };

  const moveBackward = () => {
    dispatch({ type: "sub" });
  };

  const updateTime = (props) => {
    dispatch({ type: "update", payload: props });
  };

  return (
    <div className="App">
      <div className="title">Synchronized Clocks</div>
      <div className="clocks-container">
        <Clock
          clockType="analog"
          className="clock"
          time={time}
          moveForward={moveForward}
          moveBackward={moveBackward}
        />
        <Clock
          clockType="digital"
          className="clock"
          time={time}
          updateTime={updateTime}
        />
      </div>
    </div>
  );
};

export default App;
