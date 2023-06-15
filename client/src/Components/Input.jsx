import Categorias from "./Categorias";
import axiosAdd from "../api/axiosAdd";
import useGlobalStore from "../store/Store";
import "./Input.css";
import { useState } from "react";
import Popup from "./Popup";
import useErrorHandler from "../hooks/useErrorHandler";

const Input = () => {
  const setReset = useGlobalStore((state) => state.setReset);

  const [popupConfig, setPopupConfig] = useState({ toConfirm: true });

  const post = async (e) => {
    e.preventDefault();
    await axiosAdd(e)
      .then((data) => {
        if (data === "Added input") {
          setPopupConfig({
            type: "ok",
            text: "Agregado",
            activate: true,
            fast: true,
          });
          setReset();
          document.getElementById("myForm").reset();
        }
      })
      .catch((err) => setPopupConfig(useErrorHandler(err)));
  };

  return (
    <>
      <Popup config={{ popupConfig, setPopupConfig }} />
      <form className="input" onSubmit={(e) => post(e)} id="myForm">
        <Categorias />
        <button type="submit">Cargar</button>
      </form>
    </>
  );
};
export default Input;
