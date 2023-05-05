import axios from "axios";
import { useContext } from "react";
import { context } from "../App";
import Categorias from "./Categorias";
import { API } from "../utils/api";

const Input = () => {
  const { reset, setReset } = useContext(context);

  const post = async (e) => {
    e.preventDefault();
    await axios
      .post(
        API + '/add',
        {
          tipo: e.target.tipo.value,
          input: e.target.input.value,
          detalle: e.target.detalle.value,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => setReset(!reset))
      .catch((err) => {
        console.log(err.response.data);
        window.alert(
          "Error al enviar datos del servidor, contacte al administrador"
        );
      });
    document.getElementById("myForm").reset();
  };

  return (
    <form className="homeform" onSubmit={(e) => post(e)} id="myForm">
      <Categorias />
      <button type="submit">Cargar</button>
    </form>
  );
};
export default Input;
