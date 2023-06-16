import { useEffect, useState } from "react";
import "./ListInputs.css";
import useGlobalStore from "../store/Store";
import axiosClear from "../api/axiosClear";
import axiosDeleteItem from "../api/axiosDeleteItem";
import axiosUpdateItem from "../api/axiosUpdateItem";
import modify from "../assets/modificar.png";
import del from "../assets/eliminar.png";
import Search from "./Search";
import Popup from "./Popup";
import useErrorHandler from "../hooks/useErrorHandler";
import totalNeto from "../helpers/totalNeto.js";
import useSanitize from "../hooks/useSanitize";

const ListInputs = () => {
  const [modificar, setModificar] = useState(false);
  const [idElemento, setIdElemento] = useState("");

  const [popupConfig, setPopupConfig] = useState({ toConfirm: true });
  const [detalleValue, setDetalleValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const { inputs, reset, setReset, storeGetAllInputs, filtered } =
    useGlobalStore();

  const detalle = (e) => {
    const sanitize = useSanitize(e.target.value);
    setDetalleValue(sanitize);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      updateItem(e, inputValue, detalleValue);
    }
  };

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
          if (data === "Item deleted") {
            setPopupConfig({
              type: "ok",
              text: "Item eliminado",
              activate: true,
              fast: true,
            });
            setReset();
          }
        })
        .catch((err) => setPopupConfig(useErrorHandler(err)));
  };

  const updateItem = async (e, inputValue, detalleValue) => {
    e.preventDefault();
    await axiosUpdateItem(idElemento, inputValue, detalleValue)
      .then((data) => {
        setReset();
        if (data === "Updated") {
          setPopupConfig({
            type: "ok",
            text: "Item Actualizado",
            activate: true,
          });
          setModificar(!modificar);
          setDetalleValue("");
          setInputValue("");
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
      <Popup config={{ popupConfig, setPopupConfig }} />
      {inputs.length == 0
        ? "Sin entradas"
        : filtered
        ? `Total en entradas filtradas: $${totalNeto(filtered)}`
        : "Entradas"}
      {inputs.length !== 0 ? <Search /> : null}
      {inputs.length > 0 ? (
        <button className="clearAll" onClick={() => clearTrue()}>
          Limpiar todo
        </button>
      ) : null}
      {search.map((element, key) => (
        <div key={key}>
          <div className="listElement">
            <img
              className="img"
              src={del}
              alt=""
              onClick={() => deleteItem(element._id)}
            />

            <img
              className="img"
              src={modify}
              alt=""
              onClick={() => {
                setModificar(!modificar);
                setIdElemento(element._id);
              }}
            />

            <p
              className={
                element.input === 0
                  ? "neutral"
                  : element.input > 0
                  ? "positive"
                  : "negative"
              }
            >
              {element.input === 0 ? "$" : element.input > 0 ? "+$ " : "-$ "}
              {element.input >= 0 ? element.input : element.input * -1}
            </p>
            {element.detalle !== "" ? <p>{element.detalle}</p> : null}
          </div>
          <div className="divide"></div>
        </div>
      ))}
      {modificar ? (
        <>
          <form onSubmit={(e) => updateItem(e)} className="homeformList">
            <input
              placeholder="$"
              type="number"
              name="input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
              className="inputPriceItem"
            />
            <textarea
              placeholder="detalle"
              name="detalle"
              value={detalleValue}
              onChange={(e) => detalle(e)}
              className="inputTextItem"
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <div className="buttons">
              <button
                onClick={() => {
                  setModificar(!modificar);
                }}
                className="inputCancelar"
              >
                Cancelar
              </button>
              <button type="submit" className="inputAplicar">
                Aplicar
              </button>
            </div>
          </form>
        </>
      ) : null}
    </div>
  );
};
export default ListInputs;
