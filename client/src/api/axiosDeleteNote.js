import API from "./apiUrl";
import axios from "axios";

const axiosDeleteNote = async (id) => {
  return await axios
    .delete(API + "/deleteNote/" + id, {data:{
      token: sessionStorage.getItem("user"),
    }})
    .then((data) => data.data)
    .catch((err) => {
      console.log(err.response.data);
      window.alert(
        "Error al eliminar la nota, contacte al administrador"
      );
    });
};

export default axiosDeleteNote;
