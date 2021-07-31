const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const { formatResponse, filter, arabicToRoman, _random } = require("./utils");

require("dotenv").config();

const quotes = require("./quotes");
const app = express();

app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.get("/", async (req, res, next) => {
  try {
    const { format, season, character, quote } = req.query;
    const quotesScope = filter({
      array: quotes,
      filters: { season: arabicToRoman(season), character, quote },
    });
    const data = _random(quotesScope);
    return res
      .status(200)
      .send(formatResponse({ format, data, total: quotesScope.length }));
  } catch (error) {
    console.log(error);
    return res.status(500).send({ ok: false, code: "INTERNAL_SERVER_ERROR" });
  }
});

app.get("/:id", async (req, res, next) => {
  try {
    const { format } = req.query;
    const { id } = req.params;
    const quotesScope = quotes.filter((quote) => quote.id?.toString() === id);
    const data = _random(quotesScope);
    return res
      .status(200)
      .send(formatResponse({ format, data, total: quotesScope.length }));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ ok: false, message: "INTERNAL_SERVER_ERROR" });
  }
});

app.use((req, res, next) => {
  res.status(404).send({ ok: false, message: "NOT_FOUND" });
});

app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
