const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();

//midlewares

app.use(
  cors({
    origin: "https://fipe.savat.ar",
    // origin: "http://localhost:5173",
    credentials: true,
  })
);
// app.set("trust proxy", 1);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/", (req, res) => {res.send("Server ON")});
app.use("/api", require("./routes/routes"));

module.exports = app;
