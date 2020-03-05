import React from "react";
import "./Timer.css";

function Timer({ remainingSeconds }) {
  return <h3>{remainingSeconds}</h3>;
}

export default Timer;
