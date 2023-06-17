const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email });
    if (userFound) {
      const passwordOk = bcryptjs.compareSync(
        req.body.password,
        userFound.password
      );
      const remember = bcryptjs.compareSync(
        req.body.password,
        userFound.rememberPassword
      );
      if (passwordOk || remember) {
        const payload = { id: userFound._id };
        const token = jwt.sign(payload, process.env.SECRET_KEY);
        res.send({
          status: "Logged",
          token: token,
          nickname: userFound.nickname,
        });
      } else {
        res.send({ status: "Incorrect pasword" });
      }
    } else {
      res.send({ status: "User not found" });
    }
  } catch (err) {
    res.status(500).send("err in login : " + err);
  }
};

module.exports = login;
