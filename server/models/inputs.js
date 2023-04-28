const mongoose = require("mongoose");

// Describo como es el dato que ingresa con un Schema

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
