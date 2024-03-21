const User = require("../models/user");
const jwt = require("jsonwebtoken");

const updateNickname = async (req, res) => {
  try {
    const { id } = jwt.verify(req.body.token, process.env.SECRET_KEY);
    const userFound = await User.findById(id);
    userFound.nickname = req.body.nickname;
    await userFound.save();
    res.send("Updated nickname");
  } catch (err) {
    res.status(500).send("Error aca: " + err);
  }
};

module.exports = updateNickname;
