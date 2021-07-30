const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const yup = require("yup");
const { nanoid } = require("nanoid");

require("dotenv").config();

const quotes = require("./quotes");
const app = express();

app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

const _random = (array) => array[Math.floor(Math.random() * array.length)];

app.get("/", async (req, res, next) => {
  try {
    const { from } = req.query;
    console.log(from);
    return res.status(200).send({ ok: true, data: _random(quotes) });
  } catch (error) {
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
