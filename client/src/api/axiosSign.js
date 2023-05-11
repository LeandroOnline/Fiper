
import API from "./apiUrl";
import axios from "axios";

const sign = async (send) => {
  
    await axios
      .post(API + "/adduser", send )
      .then((data) => {
        if (data.data === "Usuario existente") {
          window.alert(
            "Usuario 'Existente', prueve otro email o inicie sesion"
          );
        } else {
          window.alert("Usuario Agregado");
        }
      })
      .catch((err) => console.log(err));
 
};

export default sign;