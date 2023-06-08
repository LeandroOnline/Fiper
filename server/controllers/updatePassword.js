const jwt = require("jsonwebtoken");
const User = require("../models/user");

const updatePassword = async (req, res) => {
  try {
    const { id } = jwt.verify(req.body.token, process.env.SECRET_KEY);
    const userUpdate = await User.findById(id);
    userUpdate.password = req.body.newPassword;
  } catch (err) {}
};
module.exports = updatePassword;
