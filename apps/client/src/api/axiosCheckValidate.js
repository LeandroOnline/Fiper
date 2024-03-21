import API from "./apiUrl";
import axios from "axios";

const axiosCheckValidate = async (id) =>
  await axios
    .get(API + "/checkValidate/" + id, { timeout: 8000 })
    .then((data) => data.data)

export default axiosCheckValidate;
