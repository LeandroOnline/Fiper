const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const controllers = {};
const Inputs = require("../models/inputs");
const User = require("../models/user");
const Note = require("../models/note");

// Admin
controllers.get = async (req, res) => {
  try {
    const all = await Inputs.find();
    res.json(all);
  } catch (err) {
    res.status(500).send(err);
  }
};

controllers.getAllNotes = async (req, res) => {
  try {
    const all = await Note.find();
    res.json(all);
  } catch (err) {
    res.status(500).send(err);
  }
};

controllers.deleteAllNotes = async (req, res) => {
  try {
    await Note.deleteMany({});
    res.send("All notes deleted");
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
