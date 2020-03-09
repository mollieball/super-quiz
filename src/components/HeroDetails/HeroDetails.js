import React from "react";
import Image from "react-bootstrap/Image";
import "./HeroDetails.css";

function HeroDetails({ name, image, isCrossed, imageStyle }) {
  return (
    <div className="HeroDetails">
      <h1 className="super-hero-name">{name}</h1>

      <div className="super-hero-avatar">
        {isCrossed && (
          <div className="is-crossed">
            <h3>Skipped</h3>
          </div>
        )}
        <Image
          src={image}
          alt={name}
          className="superhero-profile"
          style={{ opacity: isCrossed ? 0.5 : 1, ...imageStyle }}
          fluid
        />
      </div>
    </div>
  );
}

export default HeroDetails;
