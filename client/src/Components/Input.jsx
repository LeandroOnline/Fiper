import axiosAdd from "../api/axiosAdd";
import useGlobalStore from "../store/Store";
import "./Input.css";
import { useState } from "react";
import Popup from "./Popup";
import useErrorHandler from "../hooks/useErrorHandler";
import useSanitize from "../hooks/useSanitize";
import coin from "../assets/sound/coin.mp3";

const Input = () => {
  const setReset = useGlobalStore((state) => state.setReset);
  const sound = useGlobalStore((state) => state.sound);

  const [popupConfig, setPopupConfig] = useState({ toConfirm: true });
  const [detalleValue, setDetalleValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const detalle = (e) => {
    const sanitize = useSanitize(e.target.value);
    setDetalleValue(sanitize);
  };

  const post = async (e, inputValue, detalleValue) => {
    e.preventDefault();

    if (inputValue === "" || inputValue === "0") {
      setPopupConfig({
        type: "error",
        text: "Ingrese un valor distinto a 0",
        activate: true,
        fast: true,
      });
    } else {
      await axiosAdd(inputValue, detalleValue)
        .then((data) => {
          if (data === "Added input") {
            setPopupConfig({
              type: "ok",
              text: "Agregado",
              activate: true,
              fast: true,
            });
            setReset();
            setDetalleValue("");
            setInputValue("");
            const audio = new Audio(coin);
            sound ? audio.play() : null;
          }
        })
        .catch((err) => setPopupConfig(useErrorHandler(err)));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      post(e, inputValue, detalleValue);
    }
  };

  return (
    <>
      <Popup config={{ popupConfig, setPopupConfig }} />
      <form
        className="input"
        onSubmit={(e) => post(e, inputValue, detalleValue)}
        id="myForm"
      >
        <input
          placeholder="+ / -"
          type="number"
          name="input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
          className="inputPriceItem"
        />
        <textarea
          placeholder="Detalle"
          name="detalle"
          value={detalleValue}
          onChange={(e) => detalle(e)}
          className="inputTextItem"
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <button type="submit">Enter</button>
      </form>
    </>
  );
};
export default Input;
