const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://fipe.savat.ar'],
    credentials: true,
  })
);
app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api", require("./routes/routes"));

module.exports = app;
