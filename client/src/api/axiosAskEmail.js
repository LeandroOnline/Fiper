import API from "./apiUrl";
import axios from "axios";

const axiosAskEmail = async () =>
  await axios
    .get(API + "/askEmail", {
      data: {
        token: sessionStorage.getItem("user"),
      },
      timeout: 6000,
    })
    .then((data) => data.data);

export default axiosAskEmail;
