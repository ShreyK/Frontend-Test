import React, { useState, useEffect, useRef } from "react";
import moment from "moment";

import "./AnalogClock.scss";
import "./DigitalClock.scss";

const Clock = (props) => {
  const editTimeRef = useRef();
  const [isEdit, setEdit] = useState(false);
  const clockType = props.clockType;

  const editDigitalClock = () => {
    if (!isEdit) {
      setEdit(!isEdit);
    }
  };

  const renderAnalogClock = () => {
    let hours = moment(props.time).hour();
    let minutes = moment(props.time).minute();
    let seconds = moment(props.time).seconds();
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
        <button onClick={props.moveForward}>Move Forward in Time</button>
        <button onClick={props.moveBackward}>Move Backward in Time</button>
      </div>
    );
  };

  const renderEditableDigitalClock = () => {
    return (
      <div>
        <input
          type="time"
          ref={editTimeRef}
          defaultValue={moment(props.time).format("hh:mm")}
        ></input>
        <button
          onClick={() => {
            let editTime = editTimeRef.current.value;
            let newTime = moment();
            newTime.set("hour", editTime.split(":")[0]);
            newTime.set("minute", editTime.split(":")[1]);
            props.updateTime(newTime);
            setEdit(false);
          }}
        >
          Update Time
        </button>
      </div>
    );
  };

  const renderDigitalClock = () => {
    let hours = moment(props.time).hour();
    let minutes = moment(props.time).minute();
    let seconds = moment(props.time).seconds();
    return (
      <div className="digital-clock" onClick={editDigitalClock}>
        {isEdit ? (
          renderEditableDigitalClock()
        ) : (
          <div>{moment(props.time).format("LTS")}</div>
        )}
      </div>
    );
  };

  return clockType === "analog" ? renderAnalogClock() : renderDigitalClock();
};

export default Clock;
