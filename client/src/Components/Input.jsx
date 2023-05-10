import Categorias from "./Categorias";
import useGlobalStore from "../store/Store";
import axiosAdd from "../api/axiosAdd"
import axiosGetAllInputs from "../api/axiosGetAllInputs";

const Input = () => {
  const setInputs = useGlobalStore((state) => state.setInputs);

  const post = async (e) => {
    e.preventDefault();
    await axiosAdd(e);
    await axiosGetAllInputs().then((data) => setInputs(data));
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
