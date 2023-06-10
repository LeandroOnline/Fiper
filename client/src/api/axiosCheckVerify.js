import API from "./apiUrl";
import axios from "axios";

const axiosCheckVerify = async () => {
  return await axios
    .post(API + "/checkVerify", {
      token: sessionStorage.getItem("user"),
    })
    .then((data) => (data.data === "Checked" ? true : false))
    .catch((err) => console.log(err));
};
export default axiosCheckVerify;
