const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Inputs = require("../models/inputs");

const getAllInputs = async (req, res) => {
  try {
    const { id } = jwt.verify(req.body.token, process.env.SECRET_KEY);
    if (id) {
      const user = await User.findById(id).populate("inputs");
      res.json(user.inputs);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = getAllInputs;
