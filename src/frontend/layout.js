import React from "react";
import { renderToString } from "react-dom/server";
import App from "./components/app";

export default () => {
  const application = <App />;

  const html = renderToString(application);

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>C'est pas faux !</title>
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
      <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
      <style>
        @font-face {
          font-family: "folkard";
          src: local("folkard"),
            url(".\/fonts\/folkard.ttf") format("truetype");
          font-weight: normal;
        }
      </style>
    </head>
    <body style="margin:0;padding:0">
      <div id="root">${html}</div>
      <script src="./entry.js"></script>
  `;
};
