import React from "react";
import "./Button.css";

function Button({ type, ...props }) {
  const className = `button ${props.type}`;
  return (
    <button className={className} {...props}>
      {props.children}
    </button>
  );
}

export default Button;
