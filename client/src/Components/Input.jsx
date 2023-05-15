import Categorias from "./Categorias";
import axiosAdd from "../api/axiosAdd";
import useGlobalStore from "../store/Store";

const Input = () => {
  const setReset = useGlobalStore((state)=>state.setReset);
  
  const post = async (e) => {
    e.preventDefault();
    await axiosAdd(e);
    setReset();
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
};
export default Input;
