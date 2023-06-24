import { memo, useState } from "react";
import "./ProfitAndLoss.css";
import useGlobalStore from "../store/Store";
import totalNeto from "../helpers/totalNeto";
import Time from "./Time";
import dolarBlue from "../utils/dolarBlue";

const Total = memo(() => {
  const inputs = useGlobalStore((state) => state.inputs);
  const losses = useGlobalStore((state) => state.losses);
  const profits = useGlobalStore((state) => state.profits);

  const [dolar, setDolar] = useState("");
  dolarBlue().then((data) => setDolar(data));
  // const totalEnUSD = (totalNeto(inputs) / dolar).toFixed(2);

  const total = (profits) => {
    let total = 0;
    profits.forEach((prof) => (total += prof));
    return total;
  };

  return (
    <div className="totalcontainer" id="home">
      <div className="profitAndLosse">
        <h1 className="profitAndLosseTitle">Total: </h1>
        <p className="profitAndLosseResult">
          ${inputs ? totalNeto(inputs) : "0"}
        </p>
      </div>
      <div className="divideVertical"></div>
      <div className="profitAndLosse">
        <h1 className="profitAndLosseTitle">Ganancias: </h1>
        <p className="profitAndLosseResult">
          ${profits ? total(profits) : "0"}
        </p>
      </div>
      <div className="divideVertical"></div>

      <div className="profitAndLosse">
        <h1 className="profitAndLosseTitle">Gastos: </h1>
        <p className="profitAndLosseResult">${losses ? total(losses) : "0"}</p>
      </div>
      <div className="divideVertical"></div>

      <div className="profitAndLosse">
        <h1 className="profitAndLosseTitle">Dolar BLue: </h1>
        <p className="profitAndLosseResult">${dolar}</p>
      </div>
      <Time />
    </div>
  );
});
export default Total;
