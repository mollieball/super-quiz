import React, { useEffect } from "react";
import Applause from "../../../src/static/Applause.mp3";
import Sigh from "../../../src/static/Sigh.mp3";
import Cheering from "../../../src/static/Cheering.gif";
import Consoling from "../../../src/static/Consoling.gif";
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
      {score > 0 ? (
        <div>
          <img src="https://media.giphy.com/media/3osxYp14leBym7WiVa/giphy.gif" />
          <h1> "Well Done !"</h1>
        </div>
      ) : (
        <div>
          <img src="https://media.giphy.com/media/ejE4qMgkF3B7hvI9RX/giphy.gif" />
          <h1>"Try Again !"</h1>
        </div>
      )}
      <h2>Your Total Score is {score}</h2>
    </div>
  );
}

export default Score;
