import API from "./apiUrl";
import axios from "axios";

const Add = async (e) =>
  await axios
    .post(
      API + "/addInput",
      {
        // tipo: e.target.tipo.value,
        input: e.target.input.value,
        detalle: e.target.detalle.value,
        token: sessionStorage.getItem("user"),
      },
      { timeout: 6000 }
    )
    .then((data) => data.data);

export default Add;
