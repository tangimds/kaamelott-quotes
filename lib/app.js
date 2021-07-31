"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _parcelBundler = _interopRequireDefault(require("parcel-bundler"));

var _appController = _interopRequireDefault(require("./app-controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bundler = new _parcelBundler.default("./src/frontend/entry.jsx");
const app = (0, _express.default)();
app.use((0, _helmet.default)());
app.use((0, _morgan.default)("tiny"));
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(bundler.middleware());
app.get("/", async (req, res) => {
  const html = await new _appController.default(req, res).index();
  res.send(html);
});
app.use("/api/v0", require("./api/v0"));
app.use((req, res, next) => {
  res.status(404).send({
    ok: false,
    message: "NOT_FOUND"
  });
});
app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }

  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack
  });
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});