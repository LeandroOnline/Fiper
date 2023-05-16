import "./ColumnGraph.css";
import columnDataFormat from "../helpers/columnDataFormat";
import { Column } from "@ant-design/plots";
import useGlobalStore from "../store/Store";
import configColumnGraph from "../utils/configColumnGraph";
import { useEffect } from "react";

const ColumnGraph = () => {
  const { inputs, setProfitsAndLosses } = useGlobalStore();
  const data = columnDataFormat(inputs);
  console.log("ColumnGraph");

  useEffect(() => {
    setProfitsAndLosses()
  }, [inputs]);

  return (
    <div className="graficacontainer">
      <Column {...configColumnGraph(data)} />
    </div>
  );
};
export default ColumnGraph;
