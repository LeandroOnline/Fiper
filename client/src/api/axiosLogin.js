import API from "./apiUrl";
import axios from "axios";

const login = async (email, password) =>
  await axios
    .post(
      API + "/login",
      {
        email: email,
        password: password,
      }
    )
    .then((data) =>
      data.data.status === "Logged"
        ? data.data.token
        : data.data.status === "Incorrect pasword"
        ? "Incorrect pasword"
        : data.data.status === "User not found"
        ? "User not found"
        : console.log(data)
    )

    .catch((err) => {
      console.log(err);
      window.alert(
        "Error al conectar el usuario al servidor, contacte al administrador"
      );
    });

export default login;
