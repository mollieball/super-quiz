import React from "react";
import "./Timer.css";

function Timer({ className, remainingSeconds, ...props }) {
  return (
    <div className={`Timer ${className} p-4`}>
      <h3 className="animated infinite jackInTheBox text-white" {...props}>
        {remainingSeconds}
      </h3>
    </div>
  );
}

export default Timer;
