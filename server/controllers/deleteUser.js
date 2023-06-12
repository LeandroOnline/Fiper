const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Inputs = require("../models/inputs");
const Note = require("../models/note");

const deleteUser = async (req, res) => {
  try {
    // Obtenemos el usuario
    const { id } = jwt.verify(req.body.token, process.env.SECRET_KEY);
    const userFound = await User.findById(id);
    // Eliminamos cada tarea del usuario
    for (let i = 0; i < userFound.inputs.length; i++) {
      await Inputs.findByIdAndDelete(userFound.inputs[i]);
    }
    // Eliminamos cada nota del usuario
    for (let i = 0; i < userFound.notes.length; i++) {
      await Note.findByIdAndDelete(userFound.notes[i]);
    }
    // Elimino el usuario
    await User.findByIdAndDelete(id);
    res.send("Se elimino el usuario y sus entradas");
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = deleteUser;
