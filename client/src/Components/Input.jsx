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
  const [pending, setPending] = useState(false);

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
      await axiosAdd(inputValue, detalleValue, pending)
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
            setPending(false);
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

  const handleInputChange = (event) => {
    const value = event;
    const regex = /^-?\d*$/;

    if (regex.test(value)) {
      setInputValue(value);
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
        <div className="inputValue">
          <input
            placeholder="+ / -"
            type="text"
            name="input"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            className="inputPriceItem"
          />
          <div
            className="pendingContainer"
            onClick={() => setPending(!pending)}
          >
            <div className={pending ? "pendingTrue" : "pending"}>
              {pending ? "✓" : null}
            </div>
            Pendiente
          </div>
        </div>
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
