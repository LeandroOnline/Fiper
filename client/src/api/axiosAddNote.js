import API from "./apiUrl";
import axios from "axios";

const getNotes = async (title, text) => {
  const add = await axios
    .post(API + "/addNote", {
      title: title,
      text: text,
      token: sessionStorage.getItem("user"),
    })
    .then((data) => data.data)
    .catch((err) => {
      console.log(err.response.data);
      window.alert("Error al pedir las notas, contacte al administrador");
    });
  return add;
};

export default getNotes;
