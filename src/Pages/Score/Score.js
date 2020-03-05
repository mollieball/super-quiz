import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Score from "../../components/Score/Score";
import HeroDetails from "../../components/HeroDetails/HeroDetails";
import "./ScorePage.css";

function ScorePage({ history, location }) {
  if (!location.state) {
    history.push("/");
    return null;
  }

  const { answers, score } = location.state;

  const setting = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  return (
    <div className="ScorePage">
      <Score score={score} />

      <div className="" style={{ width: "100vw" }}>
        <Slider className="slider" {...setting}>
          {answers.map(answer => (
            <HeroDetails
              name={answer.name}
              image={answer.image}
              isCrossed={!answer.passed}
              imageStyle={{
                height: "300px"
              }}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default ScorePage;
