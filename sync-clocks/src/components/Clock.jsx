import React, { useState, useEffect } from "react";
import moment from "moment";

import "./AnalogClock.scss";
import "./DigitalClock.scss";

const Clock = (props) => {
  const [currentTime, setTime] = useState(moment());
  const clockType = props.clockType;

  const tick = () => {
    setTime(moment());
  };

  useEffect(() => {
    const intervalHandle = setInterval(tick, 1000);

    return () => clearInterval(intervalHandle);
  }, []);

  const renderAnalogClock = () => {
    let hours = moment(currentTime).hour();
    let minutes = moment(currentTime).minute();
    let seconds = moment(currentTime).seconds();
    let secondsHand = {
      transform: `rotate(${seconds * 6}deg)`,
    };
    let minutesHand = {
      transform: `rotate(${minutes * 6}deg)`,
    };
    let hoursHand = {
      transform: `rotate(${hours * 30}deg)`,
    };
    return (
      <div>
        <div className="analog-clock">
          <div className="dot"></div>
          <div className="hand seconds" style={secondsHand}></div>
          <div className="hand minutes" style={minutesHand}></div>
          <div className="hand hours" style={hoursHand}></div>
        </div>
        <button></button>
      </div>
    );
  };

  const renderDigitalClock = () => {
    let hours = moment(currentTime).hour();
    let minutes = moment(currentTime).minute();
    let seconds = moment(currentTime).seconds();
    return (
      <div className="digital-clock">{moment(currentTime).format("LTS")}</div>
    );
  };

  return clockType === "analog" ? renderAnalogClock() : renderDigitalClock();
};

export default Clock;
