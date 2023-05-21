import API from "./apiUrl";
import axios from "axios";
import Cookies from "js-cookie";

const logout = async () => {
  const log = await axios
    .get(API + "/logout", { withCredentials: true })
    .then((data) => {
      data;
    })
    .catch((err) => {
      console.log(err);
      window.alert(
        "Error al eliminar cookie de sesion, contacte al administrador"
      );
    });
  // const user= Cookies.get("user") 
  // if(user) Cookies.remove("user");
  return log;
};

export default logout;
