const User = require("../models/user");
const Inputs = require("../models/inputs");
const jwt = require("jsonwebtoken");

const addInput = async (req, res) => {
  try {
    const type = req.body.pending
      ? "Pending"
      : req.body.input < 0
      ? "Egresos"
      : "Ingresos";

    const newadd = new Inputs({
      tipo: type,
      input: req.body.input,
      detalle: req.body.detalle,
    });

    await newadd.save();
    const { id } = jwt.verify(req.body.token, process.env.SECRET_KEY);
    const user = await User.findById(id);
    user.inputs.push(newadd);
    await user.save();

    res.send("Added input");
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = addInput;
