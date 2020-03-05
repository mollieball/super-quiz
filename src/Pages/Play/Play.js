import React, { useState, useEffect } from "react";
import HeroDetails from "../../components/HeroDetails/HeroDetails";
import Button from "../../components/Button/Button";
import Timer from "../../components/Timer/Timer";

function Play(props) {
  const [countdown, setCountdown] = useState(5);
  const [charIndex, setCharIndex] = useState(0);
  const { characters } = props.location.state;
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [remainingSeconds, setRemainingSeconds] = useState(60);

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
      props.history.push("/score", { score, answers });
      return;
    }
    let timerId = setInterval(() => {
      setRemainingSeconds(remainingSeconds - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [countdown, remainingSeconds]);

  if (countdown > 0) {
    return (
      <React.Fragment>
        <h2>Get Ready To Play</h2>
        <h1>{countdown}</h1>
      </React.Fragment>
    );
  }

  return (
    <div>
      <Timer remainingSeconds={remainingSeconds} />
      <HeroDetails
        name={characters[charIndex].name}
        image={characters[charIndex].image}
      />
      <ul className="hints">
        {characters[charIndex].hints.map(hint => (
          <li>{hint}</li>
        ))}
      </ul>
      <div>
        <Button onClick={handleSkip}>Skip</Button>
        <Button onClick={handleCorrect}>Correct</Button>
      </div>
    </div>
  );
}

export default Play;
