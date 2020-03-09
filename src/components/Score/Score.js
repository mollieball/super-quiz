import React, { useEffect } from "react";
import Applause from "../../../src/static/Applause.mp3";
import "./Score.css";

function Score({ score }) {
  useEffect(() => {
    if (score !== 0) {
      const audio = new Audio(Applause);
      audio.play();

      setTimeout(() => {
        audio.pause();
      }, 10000);
    }
  }, [score]);

  return (
    <div className="Score">
      {score > 0 ? (
        <div>
          <h1>Well Done!</h1>
          <img
            alt="Victory"
            src="https://media.giphy.com/media/3osxYp14leBym7WiVa/giphy.gif"
          />
        </div>
      ) : (
        <div>
          <h1>Try Again!</h1>
          <img
            alt="Try again"
            src="https://media.giphy.com/media/ejE4qMgkF3B7hvI9RX/giphy.gif"
          />
        </div>
      )}
      <h2 className="mt-3">Your Total Score is {score}</h2>
    </div>
  );
}

export default Score;
