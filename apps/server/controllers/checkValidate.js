const User = require("../models/user");
const jwt = require("jsonwebtoken");

const checkValidate = async (req, res) => {
  try {
    const userFound = await User.findById(req.params.id);

    if (userFound) {
      // valido el id porque el hacker nunca tiene acceso al id hasta este momento
      // Next Steep: tendria que generar un numero aleatorio y guardarlo en el schema para corroborar
      userFound.checked = true;
      await userFound.save();
      const payload = { id: req.params.id };
      const token = jwt.sign(payload, process.env.SECRET_KEY);

      res.send({
        status: "Checked Account",
        token,
        email: userFound.email,
        nickname: userFound.nickname,
      });
    } else {
      res.send({ status: "Invalid ID, can not check account" });
    }
  } catch (err) {
    res.status(500).send("Error, can not check account: " + err);
  }
};
module.exports = checkValidate;
