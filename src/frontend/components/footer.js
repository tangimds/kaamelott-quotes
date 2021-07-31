import React, { useState } from "react";
import styled from "styled-components";

export default () => {
  return (
    <Footer>
      <div>
        <Link title="© tangimds - 2021" to="https://tangimds.com" />
      </div>
      <div>
        <Link
          title="code source"
          to="https://github.com/tangimds/kaamelott-quotes"
        />
        <Link
          title="docs API"
          to="https://github.com/tangimds/kaamelott-quotes/blob/main/DOC.md"
        />
      </div>
    </Footer>
  );
};
const Link = ({ to, title }) => (
  <LinkStyle href={to} target="_blank">
    {title}
  </LinkStyle>
);

const Footer = styled.div`
  width: 100%;
  display: flex;
  color: #fff;
  justify-content: space-between;
  padding: 1rem;
`;
const LinkStyle = styled.a`
  font-size: 0.8rem;
  color: #fff;
  margin: 0 0.3rem;
  :hover {
    color: #f1f1f1;
    font-weight: 550;
    text-decoration: underline;
  }
`;
