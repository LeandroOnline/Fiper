import "./Graphs.css";
import { Column } from "@ant-design/plots";
import useGlobalStore from "../store/Store";
import configColumnGraph from "../utils/configColumnGraph";
import { Area } from "@ant-design/plots";
import configAreaGraph from "../utils/configAreaGraph";
import totalNeto from "../helpers/totalNeto";
import dolarBlue from "../utils/dolarBlue";
import formatNumber from "../helpers/formatNumber";

import { useState } from "react";

const Graphs = () => {
  const [dolar, setDolar] = useState("");
  const inputs = useGlobalStore((state) => state.inputs);

  const losses = useGlobalStore((state) => state.losses);
  const profits = useGlobalStore((state) => state.profits);
  const netPerMonth = useGlobalStore((state) => state.netPerMonth);

  const dataArea = useGlobalStore((state) => state.dataArea);
  const dataColumn = useGlobalStore((state) => state.dataColumn);

  const date = new Date();
  const month = date.getMonth();
  dolarBlue().then((data) => setDolar(data));

  const total = (profits) => {
    let total = 0;
    profits.forEach((prof) => (total += prof));

    return formatNumber(total);
  };

  return (
    <div id="graphs" className="graphsContainer">
      <div className="datosContainer">
        Historial de meses
        <div className="rowDatos">
          <div className="profitAndLosse">
            <h1 className="profitAndLosseTitle">Total: </h1>
            <div className="incrementContainer">
              <p className="profitAndLosseResult">
                $ {inputs ? formatNumber(totalNeto(inputs)) : "0"}
              </p>
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
          <div className="profitAndLosse">
            <h1 className="profitAndLosseTitle">Ganancias: </h1>
            <div className="incrementContainer">
              <p className="profitAndLosseResult">
                $ {profits ? total(profits) : "0"}
              </p>
              <p className="calculadoraTextResultPorcent">
                {profits[month - 1] !== 0
                  ? ((profits[month] * 100) / profits[month - 1]).toFixed(0) +
                    "%"
                  : "+0%"}
              </p>
            </div>
          </div>
          <div className="divideVertical"></div>
          <div className="profitAndLosse">
            <h1 className="profitAndLosseTitle">Gastos: </h1>
            <div className="incrementContainer">
              <p className="profitAndLosseResult">
                $ {losses ? total(losses) : "0"}
              </p>
              <p className="calculadoraTextResultPorcent">
                {losses[month - 1] !== 0
                  ? ((losses[month] * 100) / losses[month - 1]).toFixed(0) + "%"
                  : "+0%"}
              </p>
            </div>
          </div>
          {/* <div className="divideVertical"></div>
          <div className="profitAndLosse">
            <h1 className="profitAndLosseTitle dolarDesktop">Dolar BLue: </h1>
            <h1 className="profitAndLosseTitle dolarMovile">D. BLue: </h1>
            <p className="profitAndLosseResult">$ {dolar}</p>
          </div> */}
        </div>
      </div>

      <div className="AreaAndColumnContainer">
        <Area {...configAreaGraph(dataArea)} className="AreaContainer" />
        <div className="divideGraphs"></div>
        <Column
          {...configColumnGraph(dataColumn)}
          className="ColumnContainer"
        />
      </div>
    </div>
  );
};
export default Graphs;
