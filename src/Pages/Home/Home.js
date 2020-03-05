import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import shuffle from "lodash.shuffle";
import Button from "../../components/Button/Button";

const ACCESS_TOKEN = "10222910447016736";
const CHARACTERS_IDS = [299, 309, 370, 374, 405, 38, 63, 69, 106, 149];

function Home(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [listOfCharacters, setListOfCharacters] = useState([]);

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
        const isMale = character.appearance.gender === "Male";
        const pronoun = isMale ? "He" : "She";

        if (character.biography["place-of-birth"]) {
          hints.push(
            `${pronoun} is born in ${character.biography["place-of-birth"]}.`
          );
        }

        if (character.biography.publisher) {
          hints.push(`The publisher is ${character.biography.publisher}.`);
        }

        if (character.appearance.race) {
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
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return "Brace yourselves, superheroes coming!!";
  }

  return (
    <div className="Home">
      <div className="hometitle">
        <h1>Welcome to SuperQuiz!</h1>
      </div>

      <div className="instructionstitle">
        <h2>Instructions:</h2>
        <p>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
        </p>
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
        >
          <Button>Superheroes</Button>
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
        >
          <Button>Villains</Button>
        </Link>

        <Link
          to={{
            pathname: "/play",
            state: { characters: listOfCharacters }
          }}
        >
          <Button>All</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
