import { memo, useState } from "react";
import "./Total.css";
import useGlobalStore from "../store/Store";
import PorcentCircle from "./PorcentCircle";
import totalNeto from "../helpers/totalNeto.js";

const Total = memo(() => {
  const [porcent, setPorcent] = useState("");
  const inputs = useGlobalStore((state) => state.inputs);

  const Porcent = (porcent) => {
    if (porcent > 100) {
      setPorcent(porcent / 10);
      console.log("control: " + porcent);
    } else {
      const total = totalNeto(inputs);
      const result = (porcent * total) / 100;
      return result;
    }
  };

  console.log("Total");

  return (
    <div className="totalcontainer">
      <h1>Total: {inputs ? totalNeto(inputs) : null}</h1>

      <div className="porcentcontainer">
        <input
          type="number"
          placeholder="%xxx"
          value={porcent}
          onChange={(e) => setPorcent(e.target.value)}
        />
        <PorcentCircle porcent={porcent} result={Porcent(porcent)} />
      </div>
    </div>
  );
});
export default Total;
