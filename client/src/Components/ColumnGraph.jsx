import "./ColumnGraph.css";
import columnDataFormat from "../helpers/columnDataFormat";
import { Column } from "@ant-design/plots";
import useGlobalStore from "../store/Store";
import configColumnGraph from "../utils/configColumnGraph";
import { useEffect } from "react";

const ColumnGraph = () => {
  const { inputs, setProfitsAndLosses } = useGlobalStore();
  const { data, profits, losses } = columnDataFormat(inputs);
  console.log("ColumnGraph");
  useEffect(() => {
    setProfitsAndLosses(profits, losses);
  }, [inputs]);

  return (
    <div className="graficacontainer">
      <Column {...configColumnGraph(data)} />
    </div>
  );
};
export default ColumnGraph;
