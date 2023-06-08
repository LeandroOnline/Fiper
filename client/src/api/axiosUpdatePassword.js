import API from "./apiUrl";
import axios from "axios";

const axiosUpdatePassword = async (currentPassword, newPassword) => {
  return await axios
    .put(API + "/updatePassword", {
      token: sessionStorage.getItem("user"),
      currentPassword: currentPassword,
      newPassword: newPassword,
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err.response.data);
      window.alert("Error al actualizar la contraseña, intente nuevamente");
    });
};

export default axiosUpdatePassword;
