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
      html: 
        `<h1>✦ Bienvenido a FIPE ✦</h1>  
        <p>Para activar tu cuenta de FIPE, accede al siguiente enlace:</p>
        <a href="${url}${userFounded.id}"><strong>→ Activar cuenta ✓</strong></a>
        <h3>Gracias por unirte.</h3><br/>
        <p>Si has recibido este correo por error, por favor ignóralo.</p>
        `,
    };
    const transport = nodemailer.createTransport(config);
    const infoSend = await transport.sendMail(menssage);
    res.send(infoSend);
  } catch (err) {
    res.status(500).send("Err in sendEmail: " + err);
  }
};

module.exports = sendEmail;
