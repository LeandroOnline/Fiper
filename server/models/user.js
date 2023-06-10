const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  inputs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inputs",
    },
  ],
  checked: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("User", userSchema);
