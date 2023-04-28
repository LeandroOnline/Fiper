const mongoose = require("mongoose");
const controllers = {};
// DB
const Inputs = require("../models/inputs");
const User = require("../models/user");

controllers.add = async (req, res) => {
  const negar = req.body.tipo === "Egresos" ? -1 : 1;
  const newadd = new Inputs({
    tipo: req.body.tipo,
    input: req.body.input * negar,
    detalle: req.body.detalle,
  });
  await newadd.save();

  const id = req.cookies.user;
  const user = await User.findById(id);
  user.inputs.push(newadd);
  await user.save();
  res.send("Added");

  // hasta el momento la tarea se crea pero sobre ningun usuario
  // si queremos agregar un input al usuario hay dos maneras, usando findByIdAndUpdate o ingresando a los inputs y usando push, el 1er metodo seria:
  // User.findByIdAndUpdate(
  //      'id_del_usuario',
  //      { $push: { inputs: { /* Propiedades de la nueva input */ } } },
  //      { new: true }, )
  // y el 2do metodo seria:
  // console.log(id);
};

controllers.adduser = async (req, res) => {
  const newuser = new User({
    email: req.body.email,
    password: req.body.password,
  });
  await newuser.save();
  res.send("Added");
};

controllers.login = async (req, res) => {
  const found = await User.findOne({ email: req.body.email });
  if (found) {
    found.password === req.body.password
      ? res.cookie("user", found._id).send("OK")
      : res.send("Incorrect pasword");
  } else {
    res.send("User not found");
  }
};

controllers.update = async (req, res) => {
  try {
    const input = await Inputs.findById(req.params.id);
    const negar =
      req.body.tipo === "Egresos"
        ? input.input > 0
          ? -1
          : 1
        : input.input < 0
        ? -1
        : 1;
    const update = {
      tipo: req.body.tipo !== "" ? req.body.tipo : input.tipo,
      input: req.body.input ? req.body.input * negar : input.input * negar,
      detalle: req.body.detalle !== "" ? req.body.detalle : input.detalle,
    };
    await Inputs.findByIdAndUpdate(req.params.id, update);
    res.send("Updated");
  } catch {
    console.log("Error al actualizar");
    res.send("Error to update");
  }
};

controllers.getall = async (req, res) => {
  const all = await Inputs.find();
  res.json(all);
};

controllers.getusers = async (req, res) => {
  const all = await User.find();
  res.json(all);
};

controllers.deleteall = async (req, res) => {
  const deleted = await Inputs.deleteMany({});
  const user = await User.deleteMany({});
  for (let cookie in req.cookies) {
    res.clearCookie(cookie);
  }
  for (let header in req.headers) {
    res.removeHeader(header);
  }

  res.send("Se elimino todo");
};

controllers.deleteItem = async (req, res) => {
  // Elimino la tarea
  await Inputs.findByIdAndDelete(req.params.id);

  // Actualizo el usuario sin la tarea eliminada
  await User.findByIdAndUpdate(req.cookies.user, {
    $pull: { inputs: req.params.id },
  });
  res.send("Se elimino el Item");
};

module.exports = controllers;
