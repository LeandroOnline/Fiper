import API from "./apiUrl";
import axios from "axios";

const Add = async (e) => {
  const add = await axios
    .post(API + "/addInput", {
      tipo: e.target.tipo.value,
      input: e.target.input.value,
      detalle: e.target.detalle.value,
      token: sessionStorage.getItem("user"),
    })
    .then((data) => data)
    .catch((err) => {
      console.log(err.response.data);
      window.alert(
        "Error al enviar datos del servidor, contacte al administrador"
      );
    });
  return add;
};

export default Add;
