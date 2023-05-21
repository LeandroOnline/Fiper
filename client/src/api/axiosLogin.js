import API from "./apiUrl";
import axios from "axios";

const login = async (email,password) => {
  await axios
    .post(
      API + "/login",
      {
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      }
    )
    .then((data) =>
      data.data === "Logged"
        ? true
        : data.data === "Incorrect pasword"
        ? window.alert("Contraseña incorrecta, ingresa nuevamente")
        : data.data === "User not found"
        ? window.alert("Usuario no encontrado")
        : console.log(data)
    )
    .catch((err) => {
      console.log(err);
      window.alert(
        "Error al conectar el usuario al servidor, contacte al administrador"
      );
    });
};

export default login;