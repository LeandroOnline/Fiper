const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String },
  text: { type: String },
  check: { type: Boolean, default: false },
});
module.exports = mongoose.model("Note", noteSchema);
