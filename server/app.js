const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();

//midlewares
// app.use(cors());
app.use(
  cors({
    origin: "https://fipe.savat.ar",
    // origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://fipe.savat.ar');
  next();
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api", require("./routes/routes"));

module.exports = app;
