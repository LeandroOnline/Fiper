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
import Popup from "./Popup";
import useErrorHandler from "../hooks/useErrorHandler";

const ListInputs = () => {
  const [modificar, setModificar] = useState(false);
  const [idElemento, setIdElemento] = useState("");
  const [send, setSend] = useState(false);

  const [popupConfig, setPopupConfig] = useState({});

  const { inputs, reset, setReset, storeGetAllInputs, filtered } =
    useGlobalStore();

  const clearTrue = async () => {
    if (window.confirm("Eliminar todas las Entradas?"))
      if (window.confirm("Esta accion no se puede revertir, desea continuar?"))
        await axiosClear()
          .then((data) => {
            setReset();
            if (data === "Deleted all inputs") {
              setPopupConfig({
                type: "ok",
                text: "Todos las entradas han sido eliminadas",
              });
            }
          })
          .catch((err) => setPopupConfig(useErrorHandler(err)));
  };

  const deleteItem = async (id) => {
    if (window.confirm("Eliminar Item?"))
      await axiosDeleteItem(id)
        .then((data) => {
          setReset();
          if (data === "Item deleted") {
            setPopupConfig({
              type: "ok",
              text: "Item eliminado",
            });
          }
        })
        .catch((err) => setPopupConfig(useErrorHandler(err)));
  };

  const updateItem = async (e) => {
    e.preventDefault();
    await axiosUpdateItem(idElemento, e)
      .then((data) => {
        setReset();
        if (data === "Updated") {
          setPopupConfig({
            type: "ok",
            text: "Item Actualizado",
          });
        }
      })
      .catch((err) => setPopupConfig(useErrorHandler(err)));
  };

  useEffect(() => {
    storeGetAllInputs();
  }, [reset, filtered]);

  const search = filtered ? filtered : inputs;

  return (
    <div className="listcontainer">
      {inputs.length == 0 ? "Sin entradas" : "Entradas:"}
      {inputs.length !== 0 ? <Search /> : null}
      <Popup config={popupConfig} />
      {inputs.length > 0 ? (
        <button className="clearAll" onClick={() => clearTrue()}>Limpiar todo</button>
      ) : null}
      {search.map((element, key) => (
        <div key={key}>
          <div className="listElement">
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
          <div className="divide"></div>
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
    </div>
  );
};
export default ListInputs;
