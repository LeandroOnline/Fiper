const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const controllers = {};
// DB
const Inputs = require("../models/inputs");
const User = require("../models/user");

controllers.add = async (req, res) => {
  try {
    const negar = req.body.tipo === "Egresos" ? -1 : 1;
    const newadd = new Inputs({
      tipo: req.body.tipo,
      input: req.body.input * negar,
      detalle: req.body.detalle,
    });
    await newadd.save();

    const { id } = jwt.verify(req.cookies.user, process.env.SECRET_KEY);
    const user = await User.findById(id);
    user.inputs.push(newadd);
    await user.save();
    res.send("Added");
  } catch (err) {
    res.status(500).send(err);
  }

  // hasta el momento la tarea se crea pero sobre ningun usuario
  // si queremos agregar un input al usuario hay dos maneras, usando findByIdAndUpdate o ingresando a los inputs y usando push, el 1er metodo seria:
  // User.findByIdAndUpdate(
  //      'id_del_usuario',
  //      { $push: { inputs: { /* Propiedades de la nueva input */ } } },
  //      { new: true }, )
};

controllers.adduser = async (req, res) => {
  try {
    const exist = await User.findOne({ email: req.body.email });
    if (exist) {
      res.send("Usuario existente");
    } else {
      const randomKey = await bcryptjs.genSalt();
      const passwordCrypt = bcryptjs.hashSync(req.body.password, randomKey);

      const newuser = new User({
        email: req.body.email,
        password: passwordCrypt,
      });

      await newuser.save();
      res.send("Added");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

controllers.login = async (req, res) => {
  try {
    const found = await User.findOne({ email: req.body.email });
    if (found) {
      const passwordOk = bcryptjs.compareSync(
        req.body.password,
        found.password
      );
      if (passwordOk) {
        const payload = { id: found._id };
        const token = jwt.sign(payload, process.env.SECRET_KEY);
        res
          .cookie("user", token, {
            maxAge: 86400000,
            // secure: true,
            // domain: "fipes.vercel.app",
            // sameSite: "lax",
            path: "/",
          })
          .send("Logged");
        // La cookie expira en 24hs
      } else {
        res.send("Incorrect pasword");
      }
    } else {
      res.send("User not found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

controllers.logout = async (req, res) => {
  try {
    res.clearCookie("user").send("Log out ok");
  } catch (err) {
    res.status(500).send(err);
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
  } catch (err) {
    res.status(500).send(err);
  }
};

controllers.getall = async (req, res) => {
  try {
    const { id } = jwt.verify(req.cookies.user, process.env.SECRET_KEY);
    if (id) {
      const user = await User.findById(id).populate("inputs");
      //populate agrega los valores de los objetId de los inputs en lugar de solo los objetId, esto me permite extraerlos y mostrarlos.
      res.json(user.inputs);
    } else {
      const all = await Inputs.find();
      res.json(all);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

controllers.deleteall = async (req, res) => {
  try {
    // Obtenemos el usuario
    const { id } = jwt.verify(req.cookies.user, process.env.SECRET_KEY);
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
    const { id } = jwt.verify(req.cookies.user, process.env.SECRET_KEY);
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
    const { id } = jwt.verify(req.cookies.user, process.env.SECRET_KEY);
    await User.findByIdAndUpdate(id, {
      $pull: { inputs: req.params.id },
    });
    res.send("Se elimino el Item");
  } catch (err) {
    res.status(500).send(err);
  }
};

// CUIDADO!! agregar permisos solo para administrador
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
