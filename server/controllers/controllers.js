const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const controllers = {};
const Inputs = require("../models/inputs");
const User = require("../models/user");


controllers.deleteall = async (req, res) => {
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

controllers.deleteUser = async (req, res) => {
  try {
    // Obtenemos el usuario
    const { id } = jwt.verify(req.body.token, process.env.SECRET_KEY);
    const user = await User.findByIdAndDelete(id);
    res.clearCookie("user").send("Se elimino el usuario");
  } catch (err) {
    res.status(500).send(err);
  }
};

controllers.deleteItem = async (req, res) => {
  try {
    // Elimino la tarea
    await Inputs.findByIdAndDelete(req.params.id);

    // Actualizo el usuario sin la tarea eliminada
    const { id } = jwt.verify(req.body.token, process.env.SECRET_KEY);
    await User.findByIdAndUpdate(id, {
      $pull: { inputs: req.params.id },
    });
    res.send("Se elimino el Item");
  } catch (err) {
    res.status(500).send(err);
  }
};

// Admin
// controllers.get = async (req, res) => {
//   try {
//     const all = await Inputs.find();
//     res.json(all);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

// controllers.del = async (req, res) => {
//   await Inputs.deleteMany({});
//   await User.deleteMany({});
//   res.send("All inputs and users deleted");
// };

// controllers.getusers = async (req, res) => {
//   try {
//     const all = await User.find();
//     res.json(all);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };
module.exports = controllers;
