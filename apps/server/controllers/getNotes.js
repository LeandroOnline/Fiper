const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getNotes = async (req, res) => {
  try {
    const { id } = jwt.verify(req.body.token, process.env.SECRET_KEY);
    const userFound = await User.findById(id).populate("notes");
    res.json(userFound.notes);
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports = getNotes;
