import API from "./apiUrl";
import axios from 'axios';

const axiosGetAllInputs = async () => {
  let inputs = await axios
    .post(API + "/getAllInputs", {
      token: sessionStorage.getItem("user")
    })
    .then((data) => data.data)
    .catch((err) => {
      console.log(err);
      window.alert(
        "Error al cargar los datos de la grafica, contacte al administrador"
      );
    });
  return inputs;
};

export default axiosGetAllInputs;
