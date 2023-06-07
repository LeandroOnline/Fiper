const Inputs = require("../models/inputs");

const updateInput = async (req, res) => {
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
    } catch (err) {
      res.status(500).send(err);
    }
  };

  module.exports = updateInput;