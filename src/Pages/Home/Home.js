import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import shuffle from "lodash.shuffle";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "../../components/Button/Button";
import HomeMusic from "../../../src/static/home-music.mp3";
import "./Home.css";

const ACCESS_TOKEN = "10222910447016736";
const CHARACTERS_IDS = [
  299,
  309,
  370,
  374,
  405,
  414,

  // 423,
  // 480,
  // 522,
  // 530,
  // 558,
  // 570,
  // 655,
  // 687,
  // 606,

  38,
  63,
  69,
  106,
  149,
  157

  // 226,
  // 241,
  // 263,
  // 317,
  // 332,
  // 527,
  // 567,
  // 644,
  // 717
];

function Home(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isShowingStart, setIsShowingStart] = useState(false);
  const [listOfCharacters, setListOfCharacters] = useState([]);

  useEffect(() => {
    if (isLoading || isShowingStart) {
      return;
    }

    const audio = new Audio(HomeMusic);
    audio.play();
    return () => audio.pause();
  }, [isLoading, isShowingStart]);

  useEffect(() => {
    setIsLoading(true);

    Promise.all(
      CHARACTERS_IDS.map(id => {
        return fetch(
          `https://www.superheroapi.com/api.php/${ACCESS_TOKEN}/${id}`
        ).then(response => response.json());
      })
    ).then(response => {
      const characters = response.map(character => {
        const hints = [];
        const isMale =
          character &&
          character.appearance &&
          character.appearance.gender === "Male";
        const pronoun = isMale ? "He" : "She";

        if (character.biography && character.biography["place-of-birth"]) {
          hints.push(
            `${pronoun} is born in ${character.biography["place-of-birth"]}.`
          );
        }

        if (character.biography && character.biography.publisher) {
          hints.push(`The publisher is ${character.biography.publisher}.`);
        }

        if (character.appearance && character.appearance.race) {
          hints.push(`${pronoun} is ${character.appearance.race}.`);
        }

        return {
          name: character.name,
          image: character.image.url,
          alignment: character.biography.alignment,
          hints
        };
      });

      setListOfCharacters(shuffle(characters));
      setIsShowingStart(true);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="Home">
      <Container>
        <Row className="justify-content-center align-items-center">
          {isLoading ? (
            <h1>Brace yourselves, superheroes coming!</h1>
          ) : isShowingStart ? (
            <Button
              backgroundColor="rgb(3, 191, 85)"
              color="white"
              onClick={() => setIsShowingStart(false)}
            >
              Press to Start
            </Button>
          ) : (
            <>
              <h1 className="animated zoomIn faster">Super Head's Up!</h1>

              <div className="animated delay-3 fadeIn d-flex flex-column justify-content-center align-items-center">
                <div className="instructions mb-3">
                  <div className="step p-3 background-one">
                    <h2>Get Started</h2>
                    <p>One player guesses, others control the device!</p>
                  </div>

                  <div className="step p-3 background-two">
                    <h2>Guess</h2>
                    <p>Guess as many characters as you can under a minute!</p>
                  </div>

                  <div className="step p-3 background-three">
                    <h2>Hurry!</h2>
                    <p>Skip if you are not sure of the answer!</p>
                  </div>
                </div>

                <div>
                  <Link
                    to={{
                      pathname: "/play",
                      state: {
                        characters: listOfCharacters.filter(
                          character => character.alignment === "good"
                        )
                      }
                    }}
                    className="mr-3"
                  >
                    <Button
                      backgroundColor="rgb(3,191,85)"
                      color="rgb(255,255,255)"
                    >
                      Superheroes
                    </Button>
                  </Link>

                  <Link
                    to={{
                      pathname: "/play",
                      state: {
                        characters: listOfCharacters.filter(
                          character => character.alignment === "bad"
                        )
                      }
                    }}
                    className="mr-3"
                  >
                    <Button
                      backgroundColor="rgb(3,119,165)"
                      color="rgb(255,255,255)"
                    >
                      Villains
                    </Button>
                  </Link>

                  <Link
                    to={{
                      pathname: "/play",
                      state: { characters: listOfCharacters }
                    }}
                  >
                    <Button
                      backgroundColor="rgb(230,0,0)"
                      color="rgb(255,255,255)"
                    >
                      All
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
