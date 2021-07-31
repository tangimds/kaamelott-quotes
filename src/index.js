const express = require("express");
const cors = require("cors");
// const morgan = require("morgan");
// const helmet = require("helmet");
const { formatResponse, filter, arabicToRoman, _random } = require("./utils");

require("dotenv").config();

const quotes = require("./quotes");
const app = express();

// app.use(helmet());
// app.use(morgan("tiny"));
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
    // const data = formatQuote(q, format);
    return res.status(200).send(formatResponse({ format, data }));
  } catch (error) {
    console.log(error);
    return res.status(500).send({ ok: false, code: "SERVER_ERROR" });
  }
});

app.get("/:id", async (req, res, next) => {
  try {
    const { format } = req.query;
    const { id } = req.params;
    const quotesScope = quotes.filter((quote) => quote.id?.toString() === id);
    const quote = _random(quotesScope);
    const data = formatQuote(quote, format);
    return res.status(200).send({ ok: true, data, total: quotesScope.length });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ ok: false, code: "SERVER_ERROR" });
  }
});
app.get("/character/:char", async (req, res, next) => {
  try {
    const { format } = req.query;
    const { char } = req.params;
    const quotesScope = quotes.filter((quote) =>
      quote.character?.includes(char)
    );
    const quote = _random(quotesScope);
    const data = formatQuote(quote, format);
    return res.status(200).send({ ok: true, data, total: quotesScope.length });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ ok: false, code: "SERVER_ERROR" });
  }
});
app.get("/season/:season", async (req, res, next) => {
  try {
    const { format } = req.query;
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
    const data = formatQuote(quote, format);
    return res.status(200).send({ ok: true, data, total: quotesScope.length });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ ok: false, code: "SERVER_ERROR" });
  }
});
app.get("/quote/:w", async (req, res, next) => {
  try {
    const { format } = req.query;
    const { w } = req.params;
    const quotesScope = quotes.filter((quote) => quote.quote?.includes(w));
    const quote = _random(quotesScope);
    const data = formatQuote(quote, format);
    return res.status(200).send({ ok: true, data, total: quotesScope.length });
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

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
