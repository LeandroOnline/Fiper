import API from "./apiUrl";
import axios from "axios";

const update = async (idElement, e) =>
  await axios
    .put(
      API + "/update/" + idElement,
      {
        tipo: e.target.tipo.value,
        input: e.target.input.value,
        detalle: e.target.detalle.value,
        token: sessionStorage.getItem("user"),
      },
      { timeout: 6000 }
    )
    .then((data) => data.data)

export default update;
