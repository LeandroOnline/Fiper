import API from "./apiUrl";
import axios from "axios";

const axiosCheckValidate = async (id) => {
  return await axios.get(API + "/checkValidate/" + id);
};
export default axiosCheckValidate;
