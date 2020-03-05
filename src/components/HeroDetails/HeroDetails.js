import React from "react";
import "./HeroDetails.css";

function HeroDetails({ name, image, isCrossed }) {
  return (
    <div className="HeroDetails">
      <h1 classname="super-hero-name">{name}</h1>
      <img
        src={image}
        alt={name}
        className="superhero-profile"
        style={{ opacity: isCrossed ? 0.5 : 1 }}
      />
    </div>
  );
}

export default HeroDetails;
