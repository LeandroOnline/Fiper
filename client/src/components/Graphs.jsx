import "./Graphs.css";
import columnDataFormat from "../helpers/columnDataFormat";
import { Column } from "@ant-design/plots";
import useGlobalStore from "../store/Store";
import configColumnGraph from "../utils/configColumnGraph";
import { useEffect } from "react";
import { Area } from "@ant-design/plots";
import areaDataFormat from "../helpers/areaDataFormat";
import configAreaGraph from "../utils/configAreaGraph";

const Graphs = () => {
  const { inputs, setNetPerMonth, setProfitsAndLosses } = useGlobalStore();
  const { dataGraph, netPerMonth } = areaDataFormat(inputs);
  const { data, profits, losses } = columnDataFormat(inputs);
  const date = new Date();
  const month = date.getMonth();

  useEffect(() => {
    setNetPerMonth(netPerMonth);
    setProfitsAndLosses(profits, losses);
  }, [inputs]);

  return (
    <div id="graphs" className="graphsContainer">
      <div className="datosContainer">
        <div className="datoContainer">
          <h1 className="datoTitle">Egresos ultimo mes:</h1>
          <p className="datoResult">{losses[month]}</p>
        </div>
        <div className="divideVertical"></div>
        <div className="datoContainer">
          <h1 className="datoTitle">NETO mes actual:</h1>
          <p className="datoResult">{netPerMonth[month]}</p>
        </div>
        <div className="divideVertical"></div>

        <div className="datoContainer">
          <h1 className="datoTitle">Ingresos ultimo mes:</h1>
          <p className="datoResult">{profits[month]}</p>
        </div>
      </div>
      <div className="AreaAndColumnContainer">
        <Area {...configAreaGraph(dataGraph)} className="AreaContainer" />
        <div className="divideGraphs"></div>
        <Column {...configColumnGraph(data)} className="ColumnContainer" />
      </div>
    </div>
  );
};
export default Graphs;
