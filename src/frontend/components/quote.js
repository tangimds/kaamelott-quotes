import React, { useEffect, useState } from "react";
import quotes from "../../quotes";
import { _random, useQuery, getQuote, queryToObject } from "../../utils";
import styled from "styled-components";

export default () => {
  const query = useQuery();

  const get = () => {
    const queryObject = queryToObject(query);
    const { data } = getQuote({
      array: quotes,
      query: {
        text: queryObject.text,
        livre: queryObject.livre,
        perso: queryObject.perso,
      },
    });
    return data;
  };
  const [value, setValue] = useState(get());
  const handleClick = () => {
    setValue(get());
  };

  useEffect(() => {
    let interval;
    const queryObject = queryToObject(query);
    if (queryObject.play === "auto") {
      interval = setInterval(() => {
        handleClick();
      }, Math.max(1, Number(queryObject.t) || 1) * 1000);
    }
    return () => clearInterval(interval);
  }, [query]);

  return (
    <Container>
      <MainContainer onClick={handleClick}>
        <ContainerQuote>
          <img
            src="./assets/images/quotation-mark.png"
            width="80"
            height="80"
          />
          <Quote>{value.quote}</Quote>
          <hr
            style={{
              width: "30%",
              border: "0.5px solid white",
              opacity: "0.5",
              margin: "2.25rem 0",
            }}
          />
          <SignContainer>
            <img
              style={{ borderRadius: "50%" }}
              src="./assets/images/characters/perceval.png"
              width="50"
              height="50"
            />
            <Sign>
              <span className="character">{value.character}</span>
              <br />
              <span className="episode">
                {value.season} - {value.episode}
              </span>
            </Sign>
          </SignContainer>
        </ContainerQuote>
      </MainContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: #fff;
  .share {
    font-size: 0.8rem;
    font-style: italic;
  }
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 2rem 4rem 2rem 1rem; // typeform aera
  }
`;

const ContainerQuote = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 60%;
`;
const MainContainer = styled.div`
  cursor: pointer;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Quote = styled.div`
  text-align: center;
  font-family: "Roboto";
  display: flex;
  font-size: 1.5rem;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SignContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Sign = styled.div`
  color: #eee;
  font-size: 1.2rem;
  .character {
    font-family: "folkard";
  }
  .episode {
    font-family: "Roboto";
    color: #ccc;
    font-size: 0.9rem;
  }
  @media (max-width: 768px) {
    font-size: 0.65rem;
  }
`;
