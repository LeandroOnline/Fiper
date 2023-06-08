const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const updatePassword = async (req, res) => {
  try {
    const { id } = jwt.verify(req.body.token, process.env.SECRET_KEY);
    const userUpdate = await User.findById(id);

    const passwordOk = bcryptjs.compareSync(
      req.body.currentPassword,
      userUpdate.password
    );

    if (passwordOk) {
      const randomKey = await bcryptjs.genSalt();
      const passwordCrypt = bcryptjs.hashSync(req.body.newPassword, randomKey);
      userUpdate.password = passwordCrypt;
      await userUpdate.save();
      res.send("Password changed");
    } else {
      res.send("Incorrect current password");
    }

  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports = updatePassword;
