import dolarBlue from "../utils/dolarBlue";
import { useState } from "react";
import "./DolarBlue.css";
import totalNeto from "../helpers/totalNeto";
import useGlobalStore from "../store/Store";

import dolares from "../assets/dolar.png";

const DolarBlue = () => {
  const [dolar, setDolar] = useState("");
  dolarBlue().then((data) => setDolar(data));
  const inputs = useGlobalStore((state) => state.inputs);
  const totalEnUSD = (totalNeto(inputs) / dolar).toFixed(2);

  return (
    <div className="dolarcontainer">
      <img src={dolares} alt="" />
      <div>
        <div>
          <p className="parr">Dolar Blue: </p> <p className="usd">${dolar}</p>
        </div>
        <p className="calculadoraText">Neto en U$D: {totalEnUSD}</p>
      </div>
    </div>
  );
};
export default DolarBlue;
