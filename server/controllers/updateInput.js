const Inputs = require("../models/inputs");

const updateInput = async (req, res) => {
  try {
    const input = await Inputs.findById(req.params.id);
    const update = {
      tipo: req.body.input < 0 ? "Egresos" : "Ingresos",
      input: req.body.input ? req.body.input : input.input,
      detalle: req.body.detalle !== "" ? req.body.detalle : input.detalle,
    };

    await Inputs.findByIdAndUpdate(req.params.id, update);
    res.send("Updated");
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = updateInput;
