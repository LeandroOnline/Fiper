import API from "./apiUrl";
import axios from "axios";

const Add = async (inputValue, detalleValue, pending) =>
  await axios
    .post(
      API + "/addInput",
      {
        input: inputValue,
        detalle: detalleValue,
        pending: pending,
        token: sessionStorage.getItem("user"),
      },
      { timeout: 8000 }
    )
    .then((data) => data.data);

export default Add;
