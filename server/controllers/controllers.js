const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const controllers = {};
const Inputs = require("../models/inputs");
const User = require("../models/user");

// Admin
controllers.get = async (req, res) => {
  try {
    const all = await Inputs.find();
    res.json(all);
  } catch (err) {
    res.status(500).send(err);
  }
};

controllers.del = async (req, res) => {
  await Inputs.deleteMany({});
  await User.deleteMany({});
  res.send("All inputs and users deleted");
};

controllers.getusers = async (req, res) => {
  try {
    const all = await User.find();
    res.json(all);
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports = controllers;
