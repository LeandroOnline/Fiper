const User = require("../models/user");
const nodemailer = require("nodemailer");

const config = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "leandrosavat@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
};

const sendEmail = async (req, res) => {
  try {
    const userFounded = await User.findOne({ email: req.body.email });
    const url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:5173/checkvalidate/"
        : "https://fipe.savat.ar/checkvalidate/";
    const menssage = {
      from: "leandrosavat@gmail.com",
      to: userFounded.email,
      subject: "Verificar cuenta de FIPE",
      text:
        "Accede al siguiente link para activar tu cuenta de FIPE, si no te has registrado en FIPE por favor ignora este correo. " +
        url +
        userFounded.id,
    };
    const transport = nodemailer.createTransport(config);
    const infoSend = await transport.sendMail(menssage);
    res.send(infoSend);
  } catch (err) {
    res.status(500).send("Err in sendEmail: " + err);
  }
};

module.exports = sendEmail;
