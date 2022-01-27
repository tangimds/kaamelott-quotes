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
      <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
    </head>
    <body style="margin:0;padding:0">
      <div id="root">${html}</div>
      <script src="./entry.js"></script>
  `;
};
