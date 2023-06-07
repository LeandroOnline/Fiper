import API from "./apiUrl";
import axios from "axios";

const deleteUser = async () => {
  const del = await axios
    .delete(API + "/deleteUser", {
      data: { token: sessionStorage.getItem("user") },
    })
    .then((data) => {
      sessionStorage.removeItem("user");
      data.data;
    })
    .catch((err) => {
      console.log(err);
      window.alert("Error al eliminar el usuario, contacte al administrador");
    });
  return del;
};

export default deleteUser;
