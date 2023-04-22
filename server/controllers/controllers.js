const controllers = {};
// DB
const db = require("../models/db");

controllers.add = async (req, res) => {
  const negar = req.body.tipo === "Egresos" ? -1 : 1;
  const newadd = new db({
    tipo: req.body.tipo,
    input: req.body.input * negar,
    detalle: req.body.detalle,
  });
  await newadd.save();
  res.send("Added");
};

controllers.update = async (req, res) => {
  try {
    const input = await db.findById(req.params.id);
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
    await db.findByIdAndUpdate(req.params.id, update);
    res.send("Updated");
  } catch {
    console.log("Error al actualizar");
    res.send("Error to update");
  }
};

controllers.getall = async (req, res) => {
  const all = await db.find();
  res.json(all);
};

controllers.deleteall = async (req, res) => {
  const deleted = await db.deleteMany({});
  res.send("Se elimino todo");
};

controllers.deleteItem = async (req, res) => {
  const deleted = await db.findByIdAndDelete(req.params.id);
  res.send("Se elimino el Item");
};

module.exports = controllers;
