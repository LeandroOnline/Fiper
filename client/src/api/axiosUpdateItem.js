import API from "./apiUrl";
import axios from "axios";

const update = async (idElement,e) => {
  return await axios
    .put(
      API + "/update/" + idElement,
      {
        tipo: e.target.tipo.value,
        input: e.target.input.value,
        detalle: e.target.detalle.value,
        token: sessionStorage.getItem("user")
      }
    )
    .then((data) => data)
    .catch((err) => {
      console.log(err.response.data);
      window.alert(
        "Error al actualizar los datos del servidor, contacte al administrador"
      );
    });
};

export default update;
