const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const sendRecuperateEmail = require("../utils/sendRecuperateEmail");

const remember = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email });
    if (userFound) {
      const generatePassword =
        "Pass" + (Math.floor(Math.random() * 9000000) + 1000000).toString();
      const randomKey = await bcryptjs.genSalt();
      const passwordCrypt = bcryptjs.hashSync(generatePassword, randomKey);
      userFound.rememberPassword = passwordCrypt;
      await userFound.save();
      await sendRecuperateEmail(req.body.email, generatePassword);
      res.send("Generate password");
    } else {
      res.send("Account not found");
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = remember;
