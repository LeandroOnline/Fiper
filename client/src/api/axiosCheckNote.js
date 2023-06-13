import API from "./apiUrl";
import axios from "axios";

const axiosCheckNote = async (id) => {
  return await axios
    .put(API + "/checkNote/" + id, {
      token: sessionStorage.getItem("user"),
    })
    .then((data) => data.data)
    .catch((err) => console.log(err));
};
export default axiosCheckNote;
