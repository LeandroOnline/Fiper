const mongoose = require("mongoose");

const InputsSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true,
  },
  input: {
    type: Number,
    required: true,
  },
  detalle: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Inputs", InputsSchema);
