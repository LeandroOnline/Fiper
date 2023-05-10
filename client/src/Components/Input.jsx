import Categorias from "./Categorias";
import useGlobalStore from "../store/Store";
import axiosAdd from "../api/axiosAdd";
import axiosGetAllInputs from "../api/axiosGetAllInputs";

const Input = () => {
  const setInputs = useGlobalStore((state) => state.setInputs);

  // si ante un input activo setInput ya evito que vuelva a renderizar Total
  // pero si el setInput modifica el inputs entonces si  renderiza el Total
  // para esto puedo hacer una propiedad del store que solo carga el inputs
  // charge data on post
  
  const post = async (e) => {
    e.preventDefault();
    await axiosAdd(e);
    await axiosGetAllInputs().then((data) => setInputs(data)); // saco esto
    console.log("get on post");

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
