const jwt = require("jsonwebtoken");
const Inputs = require("../models/inputs");
const User = require("../models/user");

const deleteItem = async (req, res) => {
    try {
      // Elimino la tarea
      await Inputs.findByIdAndDelete(req.params.id);
  
      // Actualizo el usuario sin la tarea eliminada
      const { id } = jwt.verify(req.body.token, process.env.SECRET_KEY);
      await User.findByIdAndUpdate(id, {
        $pull: { inputs: req.params.id },
      });
      res.send("Item deleted");
    } catch (err) {
      res.status(500).send(err);
    }
  };

  module.exports = deleteItem;