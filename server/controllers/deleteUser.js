const jwt = require("jsonwebtoken");
const User = require("../models/user");

const deleteUser = async (req, res) => {
    try {
      // Obtenemos el usuario
      const { id } = jwt.verify(req.body.token, process.env.SECRET_KEY);
      const user = await User.findByIdAndDelete(id);
      res.send("Se elimino el usuario");
    } catch (err) {
      res.status(500).send(err);
    }
  };

  module.exports = deleteUser;