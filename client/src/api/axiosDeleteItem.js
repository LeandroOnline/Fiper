import API from "./apiUrl";
import axios from "axios";

const del = async (id) =>
  await axios
    .delete(API + "/delete/" + id, {
      data: {
        token: sessionStorage.getItem("user"),
      },
      timeout: 8000,
    })
    .then((data) => data.data)

export default del;
