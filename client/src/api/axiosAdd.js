import API from "./apiUrl";
import axios from "axios";

const Add = async (inputValue, detalleValue) =>
  await axios
    .post(
      API + "/addInput",
      {
        input: inputValue,
        detalle: detalleValue,
        token: sessionStorage.getItem("user"),
      },
      { timeout: 6000 }
    )
    .then((data) => data.data);

export default Add;
