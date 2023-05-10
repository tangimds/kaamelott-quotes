import React, { useEffect, useState } from "react";
import Quote from "./quote";
import styled from "styled-components";
import { _random, getBackground } from "../../utils";
import { BrowserRouter as Router } from "react-router-dom";

export default () => {
  const [backgroundUrl, setBackgroundUrl] = useState();
  useEffect(() => {
    setBackgroundUrl(getBackground());

    console.log(
      "%c██╗░░██╗░█████╗░░█████╗░███╗░░░███╗███████╗██╗░░░░░░█████╗░████████╗████████╗\n" +
        "██║░██╔╝██╔══██╗██╔══██╗████╗░████║██╔════╝██║░░░░░██╔══██╗╚══██╔══╝╚══██╔══╝\n" +
        "█████═╝░███████║███████║██╔████╔██║█████╗░░██║░░░░░██║░░██║░░░██║░░░░░░██║░░░\n" +
        "██╔═██╗░██╔══██║██╔══██║██║╚██╔╝██║██╔══╝░░██║░░░░░██║░░██║░░░██║░░░░░░██║░░░\n" +
        "██║░╚██╗██║░░██║██║░░██║██║░╚═╝░██║███████╗███████╗╚█████╔╝░░░██║░░░░░░██║░░░\n" +
        "╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░░░░╚═╝╚══════╝╚══════╝░╚════╝░░░░╚═╝░░░░░░╚═╝░░░\n",
      "color: #999; font-size: .6rem;"
    );
    console.log(
      "%cParamètres url :",
      "font-family:monospace; font-size: 14px;"
    );
    console.log("\n");
    console.log(
      "%c ?text=x : citation contenant le texte `x`",
      "font-family:monospace; font-size: 11px"
    );
    console.log(
      "%c ?livre=x : citation venant du livre `x`",
      "font-family:monospace; font-size: 11px"
    );
    console.log(
      "%c ?perso=x : citation prononcé par le personnage `x`",
      "font-family:monospace; font-size: 11px"
    );
    console.log(
      "%c ?play=auto : les citations défilent toutes les 1 seconde par défaut",
      "font-family:monospace; font-size: 11px"
    );
    console.log(
      "%c ?t=x : période de défilement (toutes les `x` seconde)",
      "font-family:monospace; font-size: 11px"
    );
  }, []);

  if (!backgroundUrl) return <div>Chargement...</div>;
  return (
    <Router>
      <Container backgroundUrl={backgroundUrl}>
        <Body>
          <Quote />
        </Body>
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
  background-color: #343434;
  // background-image: url(${({ backgroundUrl }) => backgroundUrl});
  // background-size: cover;
  // background-repeat: no-repeat;
  // background-position: center center;
  z-index: 0;
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
