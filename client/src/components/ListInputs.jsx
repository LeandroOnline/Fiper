import { useEffect, useState } from "react";
import "./ListInputs.css";
import Categorias from "./Categorias";
import useGlobalStore from "../store/Store";
import axiosClear from "../api/axiosClear";
import axiosDeleteItem from "../api/axiosDeleteItem";
import axiosUpdateItem from "../api/axiosUpdateItem";

import modify from "../assets/modificar.png";
import del from "../assets/eliminar.png";
import Search from "./Search";

const ListInputs = () => {
  const [modificar, setModificar] = useState(false);
  const [idElemento, setIdElemento] = useState("");
  const [send, setSend] = useState(false);

  const { inputs, reset, setReset, storeGetAllInputs, filtered } =
    useGlobalStore();

  const clearTrue = async () => {
    if (window.confirm("SEGURO queres eliminar todas las Entradas?"))
      if (window.confirm("Seguro?, no hay vuelta atras!"))
        await axiosClear().then(() => setReset());
  };

  const deleteItem = async (id) => {
    if (window.confirm("Eliminar Item?"))
      await axiosDeleteItem(id).then(() => setReset());
  };

  const updateItem = async (e) => {
    e.preventDefault();
    await axiosUpdateItem(idElemento, e).then(() => setReset());
  };
  useEffect(() => {
    storeGetAllInputs();
  }, [reset, filtered]);

  const search = filtered ? filtered : inputs;

  return (
    <div className="listcontainer">
      Entradas:
      <Search />
      {inputs.length > 0 ? (
        <button onClick={() => clearTrue()}>Limpiar todo</button>
      ) : null}
      {search.map((element, key) => (
        <div key={key} className="listElement">
          <button onClick={() => deleteItem(element._id)}>
            <img className="img" src={del} alt="" />
          </button>
          <button
            onClick={() => {
              setModificar(!modificar);
              setIdElemento(element._id);
            }}
          >
            <img className="img" src={modify} alt="" />
          </button>
          <p className={element.input > -1 ? "positive" : "negative"}>
            {element.input > 0 ? "+" : null}
            {element.input}
          </p>
          {element.detalle !== "" ? <p>{element.detalle}</p> : null}
        </div>
      ))}
      {modificar ? (
        <>
          <form onSubmit={(e) => updateItem(e)} className="homeformList">
            <Categorias />
            <div className="buttons">
              <button type="submit" onClick={() => setSend(true)}>
                Aplicar
              </button>
              <button
                onClick={() => {
                  setModificar(!modificar);
                  setSend(false);
                }}
              >
                {send ? "Cerrar" : "Cancelar"}
              </button>
            </div>
          </form>
        </>
      ) : null}
      {inputs.length > 0 ? (
        <button onClick={() => clearTrue()}>Limpiar todo</button>
      ) : null}
    </div>
  );
};
export default ListInputs;
