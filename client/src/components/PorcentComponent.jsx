import PorcentCircle from "./PorcentCircle";
import porcentaje from "../assets/porcentaje.png";
import totalNeto from "../helpers/totalNeto.js";
import "./PorcentComponent.css";
import { useState } from "react";
import useGlobalStore from "../store/Store";


const PorcentComponent = () => {
const [porcent, setPorcent] = useState(60);
const inputs = useGlobalStore((state) => state.inputs);


  const Porcent = (porcent) => {
    if (porcent > 100) {
      setPorcent(porcent / 10);
    } else {
      const total = totalNeto(inputs);
      const result = (porcent * total) / 100;
      return result;
    }
  };
  return (
    <div className="porcentcontainer">
      <div className="circleValue">
        {/* <PorcentCircle porcent={porcent} result={Porcent(porcent)} /> */}
        <input
          type="number"
          placeholder="..."
          value={porcent}
          onChange={(e) => setPorcent(e.target.value)}
        />
      </div>
      <div className="circleValue">
        <img className="porcentimg" src={porcentaje} alt="" />=
        <p>${Porcent(porcent)}</p>
      </div>
    </div>
  );
};
export default PorcentComponent;
