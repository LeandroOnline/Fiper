const Note = require("../models/note");

const updateNote = async (req, res) => {
  try {
    const noteFound = await Note.findById(req.body.id);

    const payload = {
      title: req.body.title !== "" ? req.body.title : noteFound.title,
      text: req.body.text !== "" ? req.body.text : noteFound.text,
    };

    const updatingNote = await Note.findByIdAndUpdate(req.body.id, payload);
    await updatingNote.save();

    res.send("Updated note");
  } catch (err) {
    res.satus(500).send(err);
  }
};
module.exports = updateNote;
