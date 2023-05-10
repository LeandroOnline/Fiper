import API from "./apiUrl";
import axios from "axios";

const clear = async () => {
    return await axios
    .delete(API + "/deleteall", {
      withCredentials: true,
    })
    .then((data) => data)
    .catch((err) => {
      console.log(err.response.data);
      window.alert(
        "Error al borrar los datos del servidor, contacte al administrador"
      );
    });
}
export default clear;