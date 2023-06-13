import API from "./apiUrl";
import axios from "axios";

const update = async (id,title,text) => {
  return await axios
    .put(
      API + "/updateNote/" + id,
      {
        title: title,
        text: text,
        token: sessionStorage.getItem("user")
      }
    )
    .then((data) => data.data)
    .catch((err) => {
      console.log(err.response.data);
      window.alert(
        "Error al actualizar los datos del servidor, contacte al administrador"
      );
    });
};

export default update;
