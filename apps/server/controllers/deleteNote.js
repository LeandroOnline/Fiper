const jwt = require("jsonwebtoken");
const Note = require("../models/note");
const User = require("../models/user");

const deleteNote = async (req, res) => {
  try {
    const { id } = jwt.verify(req.body.token, process.env.SECRET_KEY);
    // elimino la nota del usuario
    const userFound = await User.findByIdAndUpdate(id, {
      $pull: { notes: req.params.id },
    });
    // elimino la nota
    await Note.findByIdAndDelete(req.params.id);
    res.send("Deleted note")
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports = deleteNote;
