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
import trash from "../assets/sound/basura.mp3";

const ListInputs = () => {
  const [modificar, setModificar] = useState(false);
  const [idElemento, setIdElemento] = useState("");
  const [popupConfig, setPopupConfig] = useState({ toConfirm: true });
  const [detalleValue, setDetalleValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const { inputs, reset, setReset, storeGetAllInputs, filtered } =
    useGlobalStore();
  const sound = useGlobalStore((state) => state.sound);

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
            const audio = new Audio(trash);
            sound ? audio.play() : null;
          }
        })
        .catch((err) => setPopupConfig(useErrorHandler(err)));
  };

  const updateItem = async (e) => {
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

  const Dates = (element) => {
    const date = new Date(element.date);
    return (
      <p className="time">
        {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
        <br></br>
        {date?.getHours().toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
        :
        {date?.getMinutes().toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </p>
    );
  };

  useEffect(() => {
    storeGetAllInputs();
  }, [reset, filtered]);

  const search = filtered ? filtered : inputs;

  const reversedInputs = [...search].reverse();

  return (
    <div className="navAndListContainer">
      <div className="navList">
        {inputs.length !== 0 ? <Search /> : null}

        {inputs.length == 0 ? (
          <p className="totalInputs">
            Sin entradas, por favor ingresa un valor
          </p>
        ) : filtered ? (
          <p className="totalInputs">${totalNeto(filtered)}</p>
        ) : (
          <p className="totalInputs">Subtotal: $</p>
        )}
        {inputs.length > 0 ? (
          <button className="clearAll" onClick={() => clearTrue()}>
            Limpiar
          </button>
        ) : null}
      </div>
      <div className="listcontainer">
        <Popup config={{ popupConfig, setPopupConfig }} />

        {reversedInputs.map((element, key) => (
          <div key={key}>
            <div className="listElement">
              <div className="inputOptions">
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
                    setInputValue("");
                    setDetalleValue("");
                  }}
                />
              </div>
              <div className="dividePoint"></div>
              <p
                className={
                  element.input === 0
                    ? "neutral"
                    : element.input > 0
                    ? "positive"
                    : "negative"
                }
              >
                {element.input === 0 ? "$" : element.input > 0 ? "+ " : "- "}
                {element.input >= 0 ? element.input : element.input * -1}
              </p>
              <div className="dividePoint"></div>

              {Dates(element)}
              <div className="dividePoint"></div>
              <span className="details">{element.detalle}</span>
            </div>
            {modificar && element._id === idElemento ? (
              <>
                <form
                  onSubmit={(e) => updateItem(e)}
                  className="listInputDetail"
                >
                  <div className="inputsUpdate">
                    <input
                      placeholder="+ / -"
                      type="number"
                      name="input"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="inputPriceItemUpdate"
                    />
                    <textarea
                      placeholder="Detalle"
                      name="detalle"
                      value={detalleValue}
                      onChange={(e) => detalle(e)}
                      className="inputTextItemUpdate"
                      onKeyDown={(e) => handleKeyDown(e)}
                    />
                  </div>
                  <div className="buttons">
                    <button
                      onClick={() => {
                        setModificar(!modificar);
                        setInputValue("");
                        setDetalleValue("");
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
            {/* <div className="divide"></div> */}
          </div>
        ))}
      </div>
    </div>
  );
};
export default ListInputs;
