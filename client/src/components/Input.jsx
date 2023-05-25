import Categorias from "./Categorias";
import axiosAdd from "../api/axiosAdd";
import useGlobalStore from "../store/Store";
import "./Input.css"

const Input = () => {
  const setReset = useGlobalStore((state)=>state.setReset);
  
  const post = async (e) => {
    e.preventDefault();
    await axiosAdd(e);
    setReset();
    document.getElementById("myForm").reset();
  };

  return (
    <form className="input" onSubmit={(e) => post(e)} id="myForm">
      <Categorias />
      <button type="submit">Cargar</button>
    </form>
  );
};
export default Input;
