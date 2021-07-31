// const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
// const yup = require("yup");
// const { nanoid } = require("nanoid");
const { formatSlackResponse } = require("./utils");

require("dotenv").config();

const quotes = require("./quotes");
const app = express();

app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

const total = quotes.length;
const notFoundQuote = {
  quote: "Hum, la, franchement.... Ca m'dit rien !",
  character: "Alexandre Astier",
};
const _random = (array) =>
  array[Math.floor(Math.random() * array.length)] || notFoundQuote;

app.get("/", async (req, res, next) => {
  try {
    const { from } = req.query;
    const quote = _random(quotes);
    const data = from === "slack" ? formatSlackResponse(quote) : quote;
    return res.status(200).send({ ok: true, data, total });
  } catch (error) {
    return res.status(500).send({ ok: false, code: "SERVER_ERROR" });
  }
});
app.get("/:id", async (req, res, next) => {
  try {
    const { from } = req.query;
    const { id } = req.params;
    const quotesScope = quotes.filter((quote) => quote.id?.toString() === id);
    const quote = _random(quotesScope);
    const data = from === "slack" ? formatSlackResponse(quote) : quote;
    return res.status(200).send({ ok: true, data, total });
  } catch (error) {
    return res.status(500).send({ ok: false, code: "SERVER_ERROR" });
  }
});
app.get("/character/:char", async (req, res, next) => {
  try {
    const { from } = req.query;
    const { char } = req.params;
    const quotesScope = quotes.filter((quote) =>
      quote.character?.includes(char)
    );
    const quote = _random(quotesScope);
    const data = from === "slack" ? formatSlackResponse(quote) : quote;
    return res.status(200).send({ ok: true, data, total });
  } catch (error) {
    return res.status(500).send({ ok: false, code: "SERVER_ERROR" });
  }
});
app.get("/season/:season", async (req, res, next) => {
  try {
    const { from } = req.query;
    let { season } = req.params;
    if (season === "1") season = "I";
    if (season === "2") season = "II";
    if (season === "3") season = "III";
    if (season === "4") season = "IV";
    if (season === "5") season = "V";
    if (season === "6") season = "VI";
    const quotesScope = quotes.filter(
      (quote) => quote.season === `Livre ${season}`
    );
    const quote = _random(quotesScope);
    const data = from === "slack" ? formatSlackResponse(quote) : quote;
    return res.status(200).send({ ok: true, data, total });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ ok: false, code: "SERVER_ERROR" });
  }
});
app.get("/word/:w", async (req, res, next) => {
  try {
    const { from } = req.query;
    const { w } = req.params;
    const quotesScope = quotes.filter((quote) => quote.quote?.includes(w));
    const quote = _random(quotesScope);
    const data = from === "slack" ? formatSlackResponse(quote) : quote;
    return res.status(200).send({ ok: true, data, total });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ ok: false, code: "SERVER_ERROR" });
  }
});

app.use((req, res, next) => {
  res.status(404).send({ ok: false, code: "NOT_FOUND" });
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

const port = process.env.PORT || 1997;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
