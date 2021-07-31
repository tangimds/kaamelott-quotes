import React, { useState } from "react";
import quotes from "../../quotes";
import { _random } from "../../utils";
import styled from "styled-components";

export default () => {
  const [value, setValue] = useState(_random(quotes));
  const handleClick = () => setValue(_random(quotes));

  return (
    <Container>
      <Quote>
        <span>❝ </span>
        {value.quote}
      </Quote>
      <Sign>
        <span className="character">{value.character}</span>
        <br />
        <span className="season">{value.season}</span> -{" "}
        <span className="episode">{value.episode}</span>
      </Sign>
      <Button onClick={handleClick}>Une autre !</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  max-width: 50%;
  padding: 2rem 1rem;
  color: #fff;
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 2rem 3.3rem 2rem 1rem; // typeform aera
  }
`;

const Quote = styled.h1`
  font-size: 1.5rem;
  span {
    font-size: 2rem;
  }
`;

const Sign = styled.h2`
  color: #eee;
  margin: 1rem 0;
  font-size: 0.8rem;
  font-style: italic;
  .character {
    font-weight: bold;
  }
  .season.episode {
    color: #ccc;
  }
`;

const Button = styled.button`
  background-color: #eee;
  border: 1px solid #ddd;
  border-radius: 999999px;
  color: #333;
  padding: 0.5rem 2rem;
  font-size: 1rem;
  opacity: 0.8;
  :hover {
    opacity: 1;
    cursor: pointer;
  }
`;
