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
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css">
      <link rel="icon" type="image/png" href="https://upload.wikimedia.org/wikipedia/fr/2/2a/Kaamelott_Premier_Volet_Logo.png" />
      <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
    </head>
    <body>
      <div id="root">${html}</div>
      <script src="./entry.js"></script>
<div style="position:fixed;top:calc(50% - 250px);right:0;transition:width 300ms ease-out;width:0;z-index:99999;" data-qa="side_panel"> <a class="typeform-share button" href="https://form.typeform.com/to/uPnDJ16U?typeform-medium=embed-snippet" data-mode="side_panel" style="box-sizing:border-box;position:absolute;top:300px;width:200px;height:48px;padding:0 20px;margin:0;cursor:pointer;background:#2E2E2E;border-radius:4px 4px 0px 0px;box-shadow:0px 2px 12px rgba(0, 0, 0, 0.06), 0px 2px 4px rgba(0, 0, 0, 0.08);display:flex;align-items:center;justify-content:flex-start;transform:rotate(-90deg);transform-origin:bottom left;color:white;text-decoration:none;z-index:9999;" data-width="320" data-height="500" target="_blank"> <span class="icon" style="width:32px;position:relative;text-align:center;transform:rotate(90deg) scale(0.85);left:-8px;"> <img alt="" src="https://images.typeform.com/images/4FEYTMcJpuBr" style="max-width:24px;max-height:24px;margin-top:10px;" /> </span> <span style="text-decoration:none;font-size:18px;font-family:Helvetica,Arial,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:100%;text-align:center;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;"> Proposition </span> </a> </div> <script> (function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm_share", b="https://embed.typeform.com/"; if(!gi.call(d,id)){ js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) } })() </script>    </body>
  </html>
  `;
};
