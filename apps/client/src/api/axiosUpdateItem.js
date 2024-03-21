import API from "./apiUrl";
import axios from "axios";

const update = async (idElement, inputValue, detalleValue, paid) =>
  await axios
    .put(
      API + "/update/" + idElement,
      {
        input: inputValue,
        detalle: detalleValue,
        paid: paid,
        token: sessionStorage.getItem("user"),
      },
      { timeout: 8000 }
    )
    .then((data) => data.data);

export default update;
