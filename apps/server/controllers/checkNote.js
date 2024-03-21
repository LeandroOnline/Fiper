const Note = require("../models/note");

const checkNote = async (req, res) => {
  try {
    const noteFound = await Note.findById(req.params.id)
    noteFound.check= !noteFound.check;
    await noteFound.save();
    res.send("Check note");
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = checkNote;
