import API from "./apiUrl";
import axios from "axios";

const logout = async () => {
  const log = await axios
    .get(API + "/logout", {
      token: sessionStorage.getItem("user"),
    })
    .then((data) => {
      data;
    })
    .catch((err) => {
      console.log(err);
      window.alert(
        "Error al eliminar cookie de sesion, contacte al administrador"
      );
    });
  return log;
};

export default logout;
