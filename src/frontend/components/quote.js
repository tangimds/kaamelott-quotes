import React, { useEffect, useState } from "react";
import quotes from "../../quotes";
import { _random, useQuery, getQuote, queryToObject } from "../../utils";
import styled from "styled-components";

export default () => {
  const query = useQuery();
  const [copied, setCopied] = useState();
  const [playAuto, setPlayAuto] = useState(false);

  const get = () => {
    const queryObject = queryToObject(query)
    const { data } = getQuote({ array: quotes, query: { text: queryObject.text, livre: queryObject.livre, perso: queryObject.perso } });
    return data;
  };
  const [value, setValue] = useState(get());
  const handleClick = () => {
    setValue(get());
    setCopied(false);
  };
  const handleShare = () => {
    const link = window.location.origin + "?id=" + value.id;
    navigator.clipboard.writeText(link);
    setCopied(true);
  };

  useEffect(() => {
    let interval;
    const queryObject = queryToObject(query)
    if (queryObject.play === 'auto') {
      setPlayAuto(true);
      interval = setInterval(() => {
        handleClick()
      }, (Math.max(1, (Number(queryObject.t) || 1))) * 1000);
    }
    return () => clearInterval(interval);
  }, [query]);

  return (
    <Container>
      <MainContainer>
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
      </MainContainer>
      {!playAuto ?
      <ButtonContainer>
        <Button onClick={handleClick}>›</Button>
        {/* <Button onClick={handleShare}>Copier lien</Button> */}
      </ButtonContainer> : null
      }
      {copied ? <span className="share">lien copié !</span> : null}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 2rem 1rem;
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
  align-items: flex-end;
  max-width:60%;
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex:1;
`;

const Quote = styled.div`
  display: flex;
  font-size: 3rem;
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
  font-size: 1.2rem;
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

const ButtonContainer = styled.div`
  display: flex;
  self-align: flex-end;
  justify-content: space-between; 
  flex-direction: column;
`

const Button = styled.button`
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  border: 1px solid #eee;
  color: #eee;
  border-radius: 999999px;
  width:2rem;
  height:2rem;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
  margin: 0.3rem;
  :hover {
    /* box-shadow: rgba(255, 255, 255, 0.4) 0px 2px 12px 0px; */
    background-color: #eee;
    color: #333;
    transform: scale(1.25);
  }
  transition: all 0.2s ease-in-out;
`;
