import Categorias from "./Categorias";
import axiosAdd from "../api/axiosAdd";
import { memo } from "react";

const Input = memo(() => {
  
  const post = async (e) => {
    e.preventDefault();
    await axiosAdd(e);
    console.log("Input -> Post");
    document.getElementById("myForm").reset();
  };

  console.log("Input");

  return (
    <form className="homeform" onSubmit={(e) => post(e)} id="myForm">
      <Categorias />
      <button type="submit">Cargar</button>
    </form>
  );
})
export default Input;
