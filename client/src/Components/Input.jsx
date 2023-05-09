import axios from "axios";
import Categorias from "./Categorias";
import API from "../api/apiUrl";
import useGlobalStore from "../store/Store";

const Input = () => {
  const setReset = useGlobalStore((state)=>state.setReset);

  const post = async (e) => {
    e.preventDefault();
    await axios
      .post(
        API + "/add",
        {
          tipo: e.target.tipo.value,
          input: e.target.input.value,
          detalle: e.target.detalle.value,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => setReset())
      .catch((err) => {
        console.log(err.response.data);
        window.alert(
          "Error al enviar datos del servidor, contacte al administrador"
        );
      });
    document.getElementById("myForm").reset();
  };

  console.log("Input");

  return (
    <form className="homeform" onSubmit={(e) => post(e)} id="myForm">
      <Categorias />
      <button type="submit">Cargar</button>
    </form>
  );
};
export default Input;
