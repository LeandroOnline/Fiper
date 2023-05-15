import { useEffect, useState } from "react";
import "./ListInputs.css";
import Categorias from "./Categorias";
import useGlobalStore from "../store/Store";
import axiosClear from "../api/axiosClear";
import axiosDeleteItem from "../api/axiosDeleteItem";
import axiosUpdateItem from "../api/axiosUpdateItem";

import modify from "../assets/modificar.png";
import del from "../assets/eliminar.png";

const ListInputs = () => {
  const [modificar, setModificar] = useState(false);
  const [idElemento, setIdElemento] = useState("");

  const { inputs, reset, setReset, storeGetAllInputs } = useGlobalStore();

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
  }, [reset]);

  console.log("ListInputs");

  return (
    <div className="listcontainer">
      Entradas:
      {inputs.map((element, key) => (
        <div key={key} className="listElement">
          <button onClick={() => deleteItem(element._id)}>
            <img src={del} alt="" />
          </button>
          <button
            onClick={() => {
              setModificar(!modificar);
              setIdElemento(element._id);
            }}
          >
            <img src={modify} alt="" />
          </button>
          <p>{element.tipo}</p>
          <p className={element.input > -1 ? "positive" : "negative"}>
            {element.input > 0 ? "+" : null}
            {element.input}
          </p>
          {element.detalle !== "" ? <p>{element.detalle}</p> : null}
        </div>
      ))}
      {modificar ? (
        <>
          <form onSubmit={(e) => updateItem(e)} className="homeform">
            <Categorias />
            <div>
              <button type="submit">Aplicar</button>
              <button onClick={() => setModificar(!modificar)}>Cancelar</button>
            </div>
          </form>
        </>
      ) : null}
      <button onClick={() => clearTrue()}>Limpiar todo</button>
    </div>
  );
};
export default ListInputs;
