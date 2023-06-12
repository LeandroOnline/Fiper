const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Note = require("../models/note");

const addNote = async (req, res) => {
  try {
    const { id } = jwt.verify(req.body.token, process.env.SECRET_KEY);
    const userFound = await User.findById(id);
    const payload = { title: req.body.title, text: req.body.text };
    const newNote = new Note(payload);
    await newNote.save();
    userFound.notes.push(newNote);
    await userFound.save();
    res.send("Saved note");
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports = addNote;
