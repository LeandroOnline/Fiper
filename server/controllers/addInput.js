const User = require("../models/user");
const Inputs = require("../models/inputs");
const jwt = require("jsonwebtoken");

const addInput = async (req, res) => {
  try {
    const negar = req.body.tipo === "Egresos" ? -1 : 1;
    const newadd = new Inputs({
      tipo: req.body.tipo,
      input: req.body.input * negar,
      detalle: req.body.detalle,
    });
    await newadd.save();

    const { id } = jwt.verify(req.body.token, process.env.SECRET_KEY);
    const user = await User.findById(id);
    user.inputs.push(newadd);
    await user.save();
    res.send("Added");
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = addInput;
