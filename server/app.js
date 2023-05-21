const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();

//midlewares

const front =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5173"
    : "https://fipe.savat.ar";

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://fipe.savat.ar'],
    credentials: true,
  })
);
app.set("trust proxy", 1);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api", require("./routes/routes"));

module.exports = app;
