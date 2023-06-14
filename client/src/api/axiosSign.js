import API from "./apiUrl";
import axios from "axios";

const sign = async (send) =>
  await axios
    .post(API + "/addUser", send, { timeout: 6000 })
    .then((data) => {
      if (data.data === "Usuario existente") {
        window.alert("Usuario 'Existente', prueve otro email o inicie sesion");
      };
      return data.data;
    })

export default sign;
