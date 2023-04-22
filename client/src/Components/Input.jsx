import axios from "axios";
import { useContext } from "react";
import { context } from "../App";
import Categorias from "./Categorias";

const API = "http://localhost:3000/api/add";

const Input = () => {
  const { reset, setReset } = useContext(context);

  const post = async (e) => {
    e.preventDefault();
    await axios
      .post(API, {
        tipo: e.target.tipo.value,
        input: e.target.input.value,
        detalle: e.target.detalle.value,
      })
      .then(() => setReset(!reset));
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
