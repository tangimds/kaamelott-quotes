import React, { useEffect, useState } from "react";
import Quote from "./quote";
import Footer from "./footer";
import styled from "styled-components";
import { _random, getBackground } from "../../utils";
import { BrowserRouter as Router } from "react-router-dom";

export default () => {
  const [backgroundUrl, setBackgroundUrl] = useState();
  useEffect(() => {
    setBackgroundUrl(getBackground());
  }, []);

  if (!backgroundUrl) return <div>Chargement...</div>;
  return (
    <Router>
      <Container backgroundUrl={backgroundUrl}>
        <Body>
          <Quote />
        </Body>
        <Footer />
      </Container>
    </Router>
  );
};

const Container = ({
  children,
  backgroundUrl = "/assets/backgrounds/0.jpg",
}) => <ContainerStyle backgroundUrl={backgroundUrl}>{children}</ContainerStyle>;

const ContainerStyle = styled.div`
  position: relative;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${({ backgroundUrl }) => backgroundUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  z-index: 0;

  ::before {
    z-index: -1;
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.75);
  }
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
