import React, { useState } from "react";
import quotes from "../../quotes";
import { _random, useQuery, getQuote, queryToObject } from "../../utils";
import styled from "styled-components";

export default () => {
  const query = useQuery();
  const get = () => {
    const { data } = getQuote({ array: quotes, query: queryToObject(query) });
    return data;
  };
  const [value, setValue] = useState(get());
  const handleClick = () => setValue(get());
  return (
    <Container>
      <ContainerQuote>
        <Quote>
          <div className="icon">❝</div>
          {value.quote}
        </Quote>
        <Sign>
          <span className="character">{value.character}</span>
          <br />
          <span className="season">{value.season}</span> -{" "}
          <span className="episode">{value.episode}</span>
        </Sign>
      </ContainerQuote>
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
    padding: 2rem 4rem 2rem 1rem; // typeform aera
  }
`;
const ContainerQuote = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Quote = styled.div`
  display: flex;
  font-size: 1.5rem;
  div {
    font-size: 2rem;
    margin-right: 0.5rem;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
    div {
      font-size: 1.3rem;
      margin-right: 0.3rem;
    }
  }
`;

const Sign = styled.div`
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
  @media (max-width: 768px) {
    font-size: 0.65rem;
  }
`;

const Button = styled.button`
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  border: 1px solid #eee;
  color: #eee;
  border-radius: 999999px;
  padding: 0.5rem 2rem;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
  :hover {
    /* box-shadow: rgba(255, 255, 255, 0.4) 0px 2px 12px 0px; */
    background-color: #eee;
    color: #333;
  }
`;
