import React from "react";
import Quote from "./quote";
import Footer from "./footer";
import styled from "styled-components";
import { _random } from "../../utils";

export default () => {
  return (
    <Container>
      <Body>
        <Quote />
      </Body>
      <Footer />
    </Container>
  );
};

const Container = ({ children }) => <ContainerStyle>{children}</ContainerStyle>;

// const backgroundList = [
//   "https://img-4.linternaute.com/xfWx8NGDYouJ5lUx37YwPzHzzgw=/820x546/smart/6e4bae02d0184a37b9064a84434cc4d5/ccmcms-linternaute/26399429.jpg",
//   "https://prmeng.rosselcdn.net/sites/default/files/dpistyles_v2/ena_16_9_extra_big/2021/06/10/node_201557/38541322/public/2021/06/10/B9727326127Z.1_20210610185444_000%2BGB2IA4MQK.1-0.jpg?itok=RKQ5r-1n1623344244",
//   "https://lvdneng.rosselcdn.net/sites/default/files/dpistyles_v2/ena_16_9_extra_big/2020/10/19/node_881237/49332990/public/2020/10/19/B9724982672Z.1_20201019162840_000%2BG0DGTFOP3.1-0.jpg?itok=sBHOaOta1603140204",
//   "http://www.slate.fr/sites/default/files/styles/1060x523/public/kamelott.jpeg",
//   "https://www.sudinfo.be/sites/default/files/dpistyles_v2/ena_sp_16_9_illustration_principale/2020/11/19/node_283066/45710781/public/2020/11/19/B9725286908Z.1_20201119101404_000+GCBH3AC91.1-0.jpg?itok=j3zTY0PC1605780726",
//   "https://img.20mn.fr/KWRmPWk1SROHQKmhzUWWnw/768x492_alexandre-astier-kaamelott.jpg",
//   "https://labibleurbaine.com/wp-content/uploads/2020/05/2577964.jpg-r_640_360-f_jpg-q_x-xxyxx-610x350.jpg",
// ];
// const getBackground = () => _random(backgroundList);

const ContainerStyle = styled.div`
  position: relative;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/test.jpg");
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
