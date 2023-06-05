import API from "./apiUrl";
import axios from "axios";

const deleteUser = async () => {
  const del = await axios
    .delete(API + "/deleteuser", {
      data:{token: sessionStorage.getItem("user")},
    })
    .then((data) => data.data)
    .catch((err) => {
      console.log(err);
      window.alert("Error al eliminar el usuario, contacte al administrador");
    });
  return del;
};

export default deleteUser;
