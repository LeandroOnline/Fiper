const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Inputs = require("../models/inputs");

const deleteAllInputs = async (req, res) => {
  try {
    // Obtenemos el usuario
    const { id } = jwt.verify(req.body.token, process.env.SECRET_KEY);
    const user = await User.findById(id);
    // Eliminamos cada tarea del usuario
    for (let i = 0; i < user.inputs.length; i++) {
      await Inputs.findByIdAndDelete(user.inputs[i]);
    }
    // Actualizamos el usuario sin tareas
    await User.findByIdAndUpdate(id, {
      $set: { inputs: [] },
    });
    res.send("Se eliminaron todos los Items");
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = deleteAllInputs;
