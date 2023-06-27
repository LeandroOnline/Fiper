import { memo, useState } from "react";
import "./ProfitAndLoss.css";
import useGlobalStore from "../store/Store";
import Time from "./Time";
import dolarBlue from "../utils/dolarBlue";
import columnDataFormat from "../helpers/columnDataFormat";
import { useEffect } from "react";
import areaDataFormat from "../helpers/areaDataFormat";

const Total = memo(() => {
  const inputs = useGlobalStore((state) => state.inputs);
  const setDataArea = useGlobalStore((state) => state.setDataArea);
  const setDataColumn = useGlobalStore((state) => state.setDataColumn);
  const setNetPerMonth = useGlobalStore((state) => state.setNetPerMonth);
  const setProfitsAndLosses = useGlobalStore((state) => state.setProfitsAndLosses);

  const { dataArea, netPerMonth } = areaDataFormat(inputs);
  const { dataColumn, profits, losses } = columnDataFormat(inputs);
  const date = new Date();
  const month = date.getMonth();

  useEffect(() => {
    setNetPerMonth(netPerMonth);
    setProfitsAndLosses(profits, losses);
    setDataArea(dataArea);
    setDataColumn(dataColumn);
  }, [inputs]);

  const [dolar, setDolar] = useState("");
  dolarBlue().then((data) => setDolar(data));

  

  const numeroGrande = 13412432452243;
  const numeroFormateado = numeroGrande.toPrecision(4);
  console.log(numeroFormateado);
  return (
    <div className="totalcontainer" id="home">
        <div className="datoContainer">
          <h1 className="datoTitle">NETO mes actual:</h1>
          <div className="incrementContainer">
            <p className="datoResult">$ {netPerMonth[month]}</p>
            <p className="calculadoraTextResultPorcent">
              {netPerMonth[month - 1] !== 0
                ? ((netPerMonth[month] * 100) / netPerMonth[month - 1]).toFixed(
                    0
                  ) + "%"
                : "+0%"}
            </p>
          </div>
        </div>
        <div className="divideVertical"></div>
        <div className="datoContainer">
          <h1 className="datoTitle">Egresos ultimo mes:</h1>
          <div className="incrementContainer">
            <p className="datoResult">$ {losses[month]}</p>
            <p className="calculadoraTextResultPorcent">
              {losses[month - 1] !== 0
                ? ((losses[month] * 100) / losses[month - 1]).toFixed(0) + "%"
                : "+0%"}
            </p>
          </div>
        </div>
        <div className="divideVertical"></div>

        <div className="datoContainer">
          <h1 className="datoTitle">Ingresos ultimo mes:</h1>
          <div className="incrementContainer">
            <p className="datoResult">$ {profits[month]}</p>
            <p className="calculadoraTextResultPorcent">
              {profits[month - 1] !== 0
                ? ((profits[month] * 100) / profits[month - 1]).toFixed(0) + "%"
                : "+0%"}
            </p>
          </div>
        </div>
      {/* </div> */}
      <Time />
    </div>
  );
});
export default Total;
