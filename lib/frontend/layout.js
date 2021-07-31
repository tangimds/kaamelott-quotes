"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _app = _interopRequireDefault(require("./components/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = helloMessage => {
  const GLOBAL_STATE = {
    text: helloMessage
  };

  const application = /*#__PURE__*/_react.default.createElement(_app.default, {
    globalState: GLOBAL_STATE
  });

  const html = (0, _server.renderToString)(application);
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <script>
      GLOBAL_STATE = ${JSON.stringify(GLOBAL_STATE)};
      </script>
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
    </body>
  </html>
  `;
};

exports.default = _default;