import API from "./apiUrl";
import axios from "axios";

const axiosDeleteNote = async (id) =>
  await axios
    .delete(API + "/deleteNote/" + id, {
      data: {
        token: sessionStorage.getItem("user"),
      },
      timeout: 6000,
    })
    .then((data) => data.data)

export default axiosDeleteNote;
