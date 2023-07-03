import { memo, useState } from "react";
import "./ProfitAndLoss.css";
import useGlobalStore from "../store/Store";
import Time from "./Time";
import dolarBlue from "../utils/dolarBlue";
import columnDataFormat from "../helpers/columnDataFormat";
import { useEffect } from "react";
import areaDataFormat from "../helpers/areaDataFormat";
import formatNumber from "../helpers/formatNumber";
import lastOnesFromThisMonth from "../helpers/lastOnesFromThisMonth";

const Total = memo(() => {
  const inputs = useGlobalStore((state) => state.inputs);
  const setDataArea = useGlobalStore((state) => state.setDataArea);
  const setDataColumn = useGlobalStore((state) => state.setDataColumn);
  const setNetPerMonth = useGlobalStore((state) => state.setNetPerMonth);
  const setPendingValue = useGlobalStore((state) => state.setPendingValue);
  const setProfitsAndLosses = useGlobalStore(
    (state) => state.setProfitsAndLosses
  );

  const { dataArea, netPerMonth, pendingValue } = areaDataFormat(inputs);
  const { dataColumn, profits, losses } = columnDataFormat(inputs);
  const date = new Date();
  const month = date.getMonth();

  useEffect(() => {
    setNetPerMonth(netPerMonth);
    setProfitsAndLosses(profits, losses);
    setDataArea(dataArea);
    setDataColumn(dataColumn);
    setPendingValue(pendingValue);
  }, [inputs]);

  const [dolar, setDolar] = useState("");
  dolarBlue().then((data) => setDolar(data));

  const result = lastOnesFromThisMonth(inputs);
  const { lastProfit = 0, lastLoss = 0, lastOne = 0 } = result || {};

  const netIncrement = () => {
    const net = netPerMonth[month];
    const prevValue = net + lastOne * -1 === 0 ? 100 : net + lastOne * -1;
    const fact =
      (net < 0 && lastOne < 0 && prevValue < 0) ||
      (net >= 0 && lastOne > 0 && prevValue < 0)
        ? -1
        : 1;
    if (net !== "undefined") {
      return (((lastOne * 100) / prevValue) * fact).toFixed(0);
    } else {
      return 0;
    }
  };

  const profitIncrement = profits[month]
    ? (
        (lastProfit * 100) /
        (profits[month] - (lastProfit === profits[month] ? 0 : lastProfit))
      ).toFixed(0)
    : 0;

  const lossesIncrement = losses[month]
    ? (
        (lastLoss * 100) /
        (losses[month] - (lastLoss * -1 === losses[month] ? 0 : lastLoss * -1))
      ).toFixed(0)
    : 0;
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
                {netIncrement() > 0
                  ? `+${formatNumber(netIncrement())}%`
                  : `${formatNumber(netIncrement())}%`}
              </p>
            </div>
          </div>
          <div className="divideVertical"></div>
          <div className="datoContainer">
            <h1 className="datoTitle">Ingresos:</h1>
            <div className="incrementContainer">
              <p className="datoResult">$ {formatNumber(profits[month])}</p>
              <p className="calculadoraTextResultPorcent">
                +{profitIncrement}%
              </p>
            </div>
          </div>
          <div className="divideVertical"></div>
          <div className="datoContainer">
            <h1 className="datoTitle">Egresos:</h1>
            <div className="incrementContainer">
              <p className="datoResult">$ {formatNumber(losses[month])}</p>
              <p className="calculadoraTextResultPorcent">
                +{lossesIncrement * -1}%
              </p>
            </div>
          </div>
          <div className="divideVertical"></div>
          <div className="datoContainer">
            <h1 className="datoTitle">Pendiente:</h1>
            <div className="incrementContainer">
              <p className="datoResult">$ {formatNumber(pendingValue)}</p>
            </div>
          </div>
        </div>
      </div>
      <Time />
    </div>
  );
});
export default Total;
