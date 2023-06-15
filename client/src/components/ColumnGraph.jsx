import "./ColumnGraph.css";
import columnDataFormat from "../helpers/columnDataFormat";
import { Column } from "@ant-design/plots";
import useGlobalStore from "../store/Store";
import configColumnGraph from "../utils/configColumnGraph";
import { useEffect } from "react";

const ColumnGraph = () => {
  const { inputs, setProfitsAndLosses } = useGlobalStore();
  const { data, profits, losses } = columnDataFormat(inputs);
  console.log(profits);

  useEffect(() => {
    setProfitsAndLosses(profits, losses);
  }, [inputs]);

  const date = new Date();
  const month = date.getMonth();

  return (
    <div className="graficacontainer">
      <div className="datosContainer">
        <h1 className="datoIng-Egr">Ingresos ultimio mes: {profits[month]}</h1>
        <h1 className="datoIng-Egr">Egresos ultimio mes: {losses[month]}</h1>
      </div>
      <Column {...configColumnGraph(data)} className="columnContainer"/>
    </div>
  );
};
export default ColumnGraph;
