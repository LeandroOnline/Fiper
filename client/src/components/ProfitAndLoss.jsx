import { memo, useState } from "react";
import "./ProfitAndLoss.css";
import useGlobalStore from "../store/Store";
import Time from "./Time";
import dolarBlue from "../utils/dolarBlue";
import columnDataFormat from "../helpers/columnDataFormat";
import { useEffect } from "react";
import areaDataFormat from "../helpers/areaDataFormat";
import formatNumber from "../helpers/formatNumber";

const Total = memo(() => {
  const inputs = useGlobalStore((state) => state.inputs);
  const setDataArea = useGlobalStore((state) => state.setDataArea);
  const setDataColumn = useGlobalStore((state) => state.setDataColumn);
  const setNetPerMonth = useGlobalStore((state) => state.setNetPerMonth);
  const setProfitsAndLosses = useGlobalStore(
    (state) => state.setProfitsAndLosses
  );

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

  return (
    <div className="totalcontainer" id="home">
      <div className="lastMonth">
        Mes en curso
        <div className="datos">
          <div className="datoContainer">
            <h1 className="datoTitle">Total:</h1>
            <div className="incrementContainer">
              <p className="datoResult">$ {formatNumber(netPerMonth[month])}</p>
              <p className="calculadoraTextResultPorcent">
                {netPerMonth[month - 1] !== 0
                  ? (
                      (netPerMonth[month] * 100) /
                      netPerMonth[month - 1]
                    ).toFixed(0) + "%"
                  : "+0%"}
              </p>
            </div>
          </div>
          <div className="divideVertical"></div>
          <div className="datoContainer">
            <h1 className="datoTitle">Egresos:</h1>
            <div className="incrementContainer">
              <p className="datoResult">$ {formatNumber(losses[month])}</p>
              <p className="calculadoraTextResultPorcent">
                {losses[month - 1] !== 0
                  ? ((losses[month] * 100) / losses[month - 1]).toFixed(0) + "%"
                  : "+0%"}
              </p>
            </div>
          </div>
          <div className="divideVertical"></div>
          <div className="datoContainer">
            <h1 className="datoTitle">Ingresos:</h1>
            <div className="incrementContainer">
              <p className="datoResult">$ {formatNumber(profits[month])}</p>
              <p className="calculadoraTextResultPorcent">
                {profits[month - 1] !== 0
                  ? ((profits[month] * 100) / profits[month - 1]).toFixed(0) +
                    "%"
                  : "+0%"}
              </p>
            </div>
          </div>
          <Time />
        </div>
      </div>
    </div>
  );
});
export default Total;
