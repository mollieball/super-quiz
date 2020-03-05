import React, { useEffect } from "react";
import Applause from "../../../src/static/Applause.mp3";
import Sigh from "../../../src/static/Sigh.mp3";
import "./Score.css";

function Score({ score }) {
  useEffect(() => {
    let audio;

    if (score === 0) {
      audio = new Audio(Sigh);
    } else {
      audio = new Audio(Applause);
    }

    audio.play();
  }, [score]);

  return (
    <div className="Score">
      <h1>{score > 0 ? "Well Done !" : "Try Again !"}</h1>
      <h2>Your Total Score is {score}</h2>
    </div>
  );
}

export default Score;
