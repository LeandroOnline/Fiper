const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try {
      const found = await User.findOne({ email: req.body.email });
      if (found) {
        const passwordOk = bcryptjs.compareSync(
          req.body.password,
          found.password
        );
        if (passwordOk) {
          const payload = { id: found._id };
          const token = jwt.sign(payload, process.env.SECRET_KEY);
          res.send({ status: "Logged", token: token });
        } else {
          res.send({ status: "Incorrect pasword", token: null });
        }
      } else {
        res.send({ status: "User not found", token: null });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  };

  module.exports = login;