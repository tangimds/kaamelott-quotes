const express = require("express");
const router = express.Router();
const quotes = require("../../quotes");
const {
  formatSlackResponse,
  filter,
  filterByProps,
  arabicToRoman,
  _random,
  getQuote,
} = require("../../utils");

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
    const { data, total } = getQuote({ array: quotes, query: req.query });
    return res.status(200).send({ ok: true, data, total });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ ok: false, code: "INTERNAL_SERVER_ERROR" });
  }
});
module.exports = router;
