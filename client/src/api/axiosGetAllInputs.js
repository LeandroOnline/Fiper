import API from "./apiUrl";
import axios from "axios";

const axiosGetAllInputs = async () =>
  await axios
    .post(
      API + "/getAllInputs",
      {
        token: sessionStorage.getItem("user"),
      },
      { timeout: 6000 }
    )
    .then((data) => data.data)

export default axiosGetAllInputs;
