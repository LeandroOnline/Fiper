const User = require("../models/user");
const jwt = require("jsonwebtoken");

const checkVerify = async (req, res) => {
  try {
    const { id } = jwt.verify(req.body.token, process.env.SECRET_KEY);
    const userFounded = await User.findById(id);
    if (userFounded.checked === true) {
        res.send("Checked")
    } else {
        res.send("notChecked")
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports = checkVerify;
