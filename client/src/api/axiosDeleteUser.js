import API from "./apiUrl";
import axios from "axios";

const deleteUser = async () =>
  await axios
    .delete(API + "/deleteUser", {
      data: { token: sessionStorage.getItem("user") },
      timeout: 8000,
    })
    .then((data) => {
      sessionStorage.removeItem("user");
      return data.data;
    })

export default deleteUser;
