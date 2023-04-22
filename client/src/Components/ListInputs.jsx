import { useContext, useEffect, useState, memo } from "react";
import axios from "axios";
import "./ListInputs.css";
import { context } from "../App";
import Categorias from "./Categorias";

const API = "http://localhost:3000/api";

const ListInputs = () => {
  const [inputs, setInputs] = useState([0]);
  const [modificar, setModificar] = useState(false);
  const [idElemento, setIdElemento] = useState("");

  let { reset, setReset } = useContext(context);

  const clearTrue = async () => {
    if (window.confirm("SEGURO queres eliminar todas las Entradas?"))
      if (window.confirm("Seguro?, no hay vuelta atras!"))
        await axios.delete(API + "/deleteall").then(() => setReset(!reset));
  };

  const deleteItem = async (id) => {
    if (window.confirm("Eliminar Item?"))
      await axios.delete(API + "/delete/" + id).then(() => setReset(!reset));
  };

  const updateItem = async (e) => {
    e.preventDefault();
    await axios
      .put(API + "/update/" + idElemento, {
        tipo: e.target.tipo.value,
        input: e.target.input.value,
        detalle: e.target.detalle.value,
      })
      .then(() => {
        setReset(!reset);
        setModificar(false);
      });
  };

  useEffect(() => {
    const get = async () =>
      await axios.get(API + "/getall").then((data) => setInputs(data.data));
    get();
  }, [reset]);

  return (
    <div className="listcontainer">
      Entradas:
      {inputs.map((element, key) => (
        <div key={key} className="listElement">
          <button onClick={() => deleteItem(element._id)}>E</button>
          <button
            onClick={() => {
              setModificar(true);
              setIdElemento(element._id);
            }}
          >
            M
          </button>
          <p>{element.tipo}</p>
          <p>{element.input}</p>
          {element.detalle !== "" ? <p>{element.detalle}</p> : null}
        </div>
      ))}
      {modificar ? (
        <>
          <form onSubmit={(e) => updateItem(e)} className="homeform">
            <Categorias />
            <div>
              <button type="submit">Aplicar</button>
              <button onClick={() => setModificar(false)}>Cancelar</button>
            </div>
          </form>
        </>
      ) : null}
      <button onClick={() => clearTrue()}>Limpiar todo</button>
    </div>
  );
};
export default ListInputs;
