import dolarBlue from "../utils/dolarBlue";
import { useState } from "react";
import "./DolarBlue.css";
import totalNeto from "../helpers/totalNeto";
import useGlobalStore from "../store/Store";

import dolares from "../assets/dolar.png";

const DolarBlue = () => {
  const [dolar, setDolar] = useState("");
  const dolarBlueHoy = dolarBlue().then((data) => setDolar(data));
  const inputs = useGlobalStore((state) => state.inputs);
  const totalEnUSD = (totalNeto(inputs) / dolar).toFixed(2);

  return (
    <div className="dolarcontainer">
      <img src={dolares} alt="" />
      <div>
        <p>Dolar Blue: ${dolar}</p>
        <p>Neto en U$D: {totalEnUSD}</p>
      </div>
    </div>
  );
};
export default DolarBlue;
