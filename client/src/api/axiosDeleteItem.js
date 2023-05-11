import API from "./apiUrl";
import axios from "axios";

const del = async(id) => {
 return  await axios
 .delete(API + "/delete/" + id, {
   withCredentials: true,
 })
 .then((data) => data)
 .catch((err) => {
   console.log(err.response.data);
   window.alert(
     "Error al eliminar los datos del servidor, contacte al administrador"
   );
 });
}

export default del;