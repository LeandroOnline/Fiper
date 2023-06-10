const User = require("../models/user");
const jwt = require("jsonwebtoken");

const checkValidate = async (req, res) => {
  try {
    // const { id } = jwt.verify(req.body.token, process.env.SECRET_KEY);
    const userFound = await User.findById(req.params.id);

    if (userFound) {
      // valido el id porque el hacker nunca tiene acceso al id hasta este momento
      // Next Steep: tendria que generar un numero aleatorio y guardarlo en el schema para corroborar
      userFound.checked = true;
      await userFound.save();
      res.send("Checked Account");
    } else {
      res.send("Invalid ID, can not check account");
    }
  } catch (err) {
    res.status(500).send("Error, can not check account: " + err);
  }
};
module.exports = checkValidate;
