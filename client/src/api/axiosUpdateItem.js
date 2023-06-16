import API from "./apiUrl";
import axios from "axios";

const update = async (idElement, inputValue, detalleValue) =>
  await axios
    .put(
      API + "/update/" + idElement,
      {
        input: inputValue,
        detalle: detalleValue,
        token: sessionStorage.getItem("user"),
      },
      { timeout: 6000 }
    )
    .then((data) => data.data)

export default update;
