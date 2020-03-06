import React from "react";
import "./Button.css";

function Button({ type = "", backgroundColor, color, ...props }) {
  const className = `Button ${props.type}`;
  return (
    <button className={className} {...props} style={{ backgroundColor, color }}>
      {props.children}
    </button>
  );
}

export default Button;
