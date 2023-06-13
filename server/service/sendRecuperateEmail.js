const nodemailer = require("nodemailer");

const config = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "leandrosavat@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
};

const sendRecuperateEmail = async (email, recuperatePass) => {
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
    const infoSend = await transport.sendMail(menssage);
    return infoSend;
  } catch (err) {
    return err;
  }
};

module.exports = sendRecuperateEmail;
