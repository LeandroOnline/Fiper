const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String },
  text: { type: String },
});
module.exports = mongoose.model("Note", noteSchema);
