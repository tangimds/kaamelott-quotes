import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import Bundler from "parcel-bundler";

const bundler = new Bundler("./src/frontend/entry.jsx");
import AppController from "./app-controller";
const app = express();

app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(bundler.middleware());

app.get("/", async (req, res) => {
  const html = await new AppController(req, res).index();
  res.send(html);
});

app.use("/api/v0", require("./api/v0"));

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
