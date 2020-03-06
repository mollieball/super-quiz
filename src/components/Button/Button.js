import React from "react";
import "./Button.css";

function Button({ type = "", className, backgroundColor, color, ...props }) {
  return (
    <button
      className={`Button ${className}`}
      {...props}
      style={{ backgroundColor, color }}
    >
      {props.children}
    </button>
  );
}

export default Button;
