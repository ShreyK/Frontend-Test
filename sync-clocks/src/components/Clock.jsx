import React, { useState, useEffect, useRef } from "react";
import moment from "moment";

import "./AnalogClock.scss";
import "./DigitalClock.scss";

const Clock = (props) => {
  const editTimeRef = useRef();
  const [isEdit, setEdit] = useState(false);
  const clockType = props.clockType;

  const tick = () => {
    props.setTime(moment(props.currentTime).add(1, "second"));
    // setTime(moment());
  };

  useEffect(() => {
    const intervalHandle = setInterval(tick, 1000);

    return () => clearInterval(intervalHandle);
  }, []);

  const moveForward = () => {
    props.setTime(moment(props.currentTime).add(1, "second"));
  };

  const moveBackward = () => {
    props.setTime(moment(props.currentTime).subtract(1, "second"));
  };

  const editDigitalClock = () => {
    if (!isEdit) {
      setEdit(!isEdit);
    }
  };

  const renderAnalogClock = () => {
    let hours = moment(props.currentTime).hour();
    let minutes = moment(props.currentTime).minute();
    let seconds = moment(props.currentTime).seconds();
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
        <button onClick={moveForward}>Move Forward in Time</button>
        <button onClick={moveBackward}>Move Backward in Time</button>
      </div>
    );
  };

  const renderEditableDigitalClock = () => {
    const time = props.currentTime;
    return (
      <div>
        <input type="time" ref={editTimeRef}></input>
        <button
          onClick={() => {
            setEdit(false);
            console.log(moment(editTimeRef.current.value.toString()));
            props.setTime(moment(editTimeRef.current.value));
          }}
        >
          Update Time
        </button>
      </div>
    );
  };

  const renderDigitalClock = () => {
    let hours = moment(props.currentTime).hour();
    let minutes = moment(props.currentTime).minute();
    let seconds = moment(props.currentTime).seconds();
    return (
      <div className="digital-clock" onClick={editDigitalClock}>
        {isEdit ? (
          renderEditableDigitalClock()
        ) : (
          <div>{moment(props.currentTime).format("LTS")}</div>
        )}
      </div>
    );
  };

  return clockType === "analog" ? renderAnalogClock() : renderDigitalClock();
};

export default Clock;
