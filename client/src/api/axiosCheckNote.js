import API from "./apiUrl";
import axios from "axios";

const axiosCheckNote = async (id) =>
  await axios
    .put(
      API + "/checkNote/" + id,
      {
        token: sessionStorage.getItem("user"),
      },
      { timeout: 6000 }
    )
    .then((data) => data.data)

export default axiosCheckNote;
