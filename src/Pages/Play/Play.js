import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import BoomImage from "../../static/boom.png";
import PlayMusic from "../../static/play-music.mp3";
import HeroDetails from "../../components/HeroDetails/HeroDetails";
import Button from "../../components/Button/Button";
import Timer from "../../components/Timer/Timer";
import "./Play.css";

function Play({ location, history, ...props }) {
  const [countdown, setCountdown] = useState(5);
  const [charIndex, setCharIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [remainingSeconds, setRemainingSeconds] = useState(3);

  useEffect(() => {
    const audio = new Audio(PlayMusic);
    audio.play();
    return () => audio.pause();
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      return;
    }
    let id = setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [countdown]);

  useEffect(() => {
    if (countdown > 0) {
      return;
    }

    if (remainingSeconds === 0) {
      setTimeout(() => {
        history.push("/score", { score, answers });
      }, 2000);
      return;
    }

    let timerId = setInterval(() => {
      setRemainingSeconds(remainingSeconds - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [countdown, remainingSeconds]);

  if (!location.state) {
    history.push("/");
    return null;
  }

  const { characters } = location.state;

  function handleSkip() {
    const answer = {
      name: characters[charIndex].name,
      image: characters[charIndex].image,
      passed: false
    };

    setAnswers([...answers, answer]);
    setCharIndex(charIndex + 1);
  }

  function handleCorrect() {
    const answer = {
      name: characters[charIndex].name,
      image: characters[charIndex].image,
      passed: true
    };

    setAnswers([...answers, answer]);
    setCharIndex(charIndex + 1);
    setScore(score + 1);
  }

  const isShowingCountdown = countdown > 0;

  return (
    <div
      className="Play"
      style={{
        backgroundColor: isShowingCountdown ? "black" : "transparent",
        backgroundImage: isShowingCountdown
          ? "none"
          : `url(${characters[charIndex].image})`
      }}
    >
      <div className="box">
        <Container>
          <Row className="justify-content-center align-items-center">
            {remainingSeconds === 0 && (
              <div className="boom animated zoomIn slow">
                <img src={BoomImage} className="img-fluid" />
              </div>
            )}

            {isShowingCountdown ? (
              <div className="get-ready text-center text-white animated infinite zoomIn">
                <h2>Get Ready To Play</h2>
                <h1>{countdown}</h1>
              </div>
            ) : (
              <React.Fragment>
                <Timer
                  className="timer d-flex align-self-center"
                  remainingSeconds={remainingSeconds}
                />

                <div className="playCard d-flex justify-content-center mb-3">
                  <HeroDetails
                    className="character"
                    name={characters[charIndex].name}
                    image={characters[charIndex].image}
                  />

                  <div className="ml-3 d-flex">
                    <ul className="hints align-self-center">
                      {characters[charIndex].hints.map(hint => (
                        <li>{hint}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="playButtons">
                  <Button
                    backgroundColor="rgb(242, 206, 26)"
                    onClick={handleSkip}
                    className="mr-3"
                  >
                    Skip
                  </Button>

                  <Button
                    backgroundColor="rgb(3, 191, 85)"
                    color="white"
                    onClick={handleCorrect}
                  >
                    Correct
                  </Button>
                </div>
              </React.Fragment>
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Play;
