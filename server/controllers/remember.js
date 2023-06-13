const User = require("../models/user");
const bcryptjs = require("bcryptjs");
// const sendRecuperateEmail = require("../utils/sendRecuperateEmail");
const nodemailer = require("nodemailer");

const config = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "leandrosavat@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
};
// test with not await for transport.sendMail(menssage);
const sendRecuperateEmail =  async (email, recuperatePass) => {
  try {
    const url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:5173/login"
        : "https://fipe.savat.ar/login";
    const menssage = {
      from: "leandrosavat@gmail.com",
      to: email,
      subject: "Recuperar contraseña de FIPE",
      html: `<p>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      <h3>Ingresa a <strong>FIPE</strong> con esta contraseña:</h3>  
        <h1>🔒 ${recuperatePass}</h1>
        <a href="${url}"><strong>🌐 www.fipe.savat.ar</strong></a><br/>
        <h4>⚠️ Recuerda que podras cambiar tu contraseña una vez que hayas ingresado</h4>
        <h4>⚠️ Si has recibido este correo por error, por favor ignóralo.</h4>
        `,
    };
    const transport = nodemailer.createTransport(config);
    const infoSend =  await transport.sendMail(menssage);
    return infoSend;
  } catch (err) {
    return err;
  }
};

const remember = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email });
    if (userFound) {
      const generatePassword =
        "Pass" + (Math.floor(Math.random() * 9000000) + 1000000).toString();
      const randomKey = await bcryptjs.genSalt();
      const passwordCrypt = bcryptjs.hashSync(generatePassword, randomKey);
      userFound.rememberPassword = passwordCrypt;
      // test with not await for save()
      await userFound.save();
      sendRecuperateEmail(req.body.email, generatePassword);
      res.send("Generate password");
    } else {
      res.send("Account not found");
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = remember;
