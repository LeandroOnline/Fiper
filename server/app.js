const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();

//midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use('/api', require('./routes/routes'));

module.exports= app;
