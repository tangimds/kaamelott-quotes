const express = require("express");
const router = express.Router();
const quotes = require("../quotes");
const {
  formatSlackResponse,
  filter,
  filterByProps,
  arabicToRoman,
  _random,
} = require("../utils");

router.get("/slack", async (req, res, next) => {
  try {
    const { text } = req.query;
    const quotesScope = filter({
      array: quotes,
      filter: text,
    });
    const data = _random(quotesScope);
    return res.status(200).send(formatSlackResponse(data));
  } catch (error) {
    console.log(error);
    return res.status(500).send({ ok: false, code: "INTERNAL_SERVER_ERROR" });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { season, character, quote } = req.query;
    const quotesScope = filterByProps({
      array: quotes,
      filters: { season: arabicToRoman(season), character, quote },
    });
    const data = _random(quotesScope);
    return res.status(200).send({ ok: true, data, total: quotesScope.length });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ ok: false, code: "INTERNAL_SERVER_ERROR" });
  }
});
module.exports = router;
