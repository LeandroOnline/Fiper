import API from "./apiUrl";
import axios from "axios";

const axiosUpdatePassword = async (currentPassword, newPassword) =>
  await axios
    .put(
      API + "/updatePassword",
      {
        token: sessionStorage.getItem("user"),
        currentPassword: currentPassword,
        newPassword: newPassword,
      },
      { timeout: 8000 }
    )
    .then((data) => data.data);

export default axiosUpdatePassword;
