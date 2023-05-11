import { useEffect, useState } from "react";
import "./Categorias.css";
import useSanitize from "../hooks/useSanitize";
import useGlobalStore from "../store/Store";

const Categorias = () => {
  const [detalleValue, setDetalleValue] = useState("");
  const { reset } = useGlobalStore();

  const detalle = (e) => {
    const sanitize = useSanitize(e.target.value);
    setDetalleValue(sanitize);
  };

  useEffect(() => {
    setDetalleValue("");
  }, [reset]);

  return (
    <>
      <select id="entrada" name="tipo">
        <option value="Ingresos" className="options">
          Ingresos
        </option>
        <option value="Egresos" className="options">
          Egresos
        </option>
      </select>
      <input placeholder="$" type="number" name="input" autoFocus />
      <input
        placeholder="Detalle"
        name="detalle"
        value={detalleValue}
        onChange={(e) => detalle(e)}
      />
    </>
  );
};
export default Categorias;
