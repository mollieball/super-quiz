import React, { useState } from "react";
import ItemsCarousel from "react-items-carousel";
import Container from "react-bootstrap/Container";
import Score from "../../components/Score/Score";
import HeroDetails from "../../components/HeroDetails/HeroDetails";
import Button from "../../components/Button/Button";
import "./ScorePage.css";

function ScorePage({ history, location }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!location.state) {
    history.push("/");
    return null;
  }

  const { answers, score } = location.state;

  return (
    <div className="ScorePage">
      <Container className="d-flex flex-column align-items-center">
        <div className="score p-3 my-4 text-center">
          <Score score={score} />
          <Button
            backgroundColor="rgb(3, 191, 85)"
            color="white"
            onClick={() => history.push("/")}
          >
            Play Again
          </Button>
        </div>

        <div className="slider p-4 mb-4">
          <ItemsCarousel
            numberOfCards={4}
            gutter={20}
            rightChevron={<Button>Next</Button>}
            leftChevron={<Button>Prev</Button>}
            chevronWidth={100}
            requestToChangeActive={setCurrentIndex}
            activeItemIndex={currentIndex}
          >
            {answers.map(answer => (
              <div>
                <HeroDetails
                  name={answer.name}
                  image={answer.image}
                  isCrossed={!answer.passed}
                  imageStyle={{
                    height: "300px"
                  }}
                />
              </div>
            ))}
          </ItemsCarousel>
        </div>
      </Container>
    </div>
  );
}

export default ScorePage;
