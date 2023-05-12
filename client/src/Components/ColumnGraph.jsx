import "./ColumnGraph.css";
import { useState } from "react";
import columnDataFormat from "../helpers/columnDataFormat";
import { Column } from "@ant-design/plots";
import useGlobalStore from "../store/Store";
import configColumnGraph from "../utils/configColumnGraph";

const ColumnGraph = () => {
  const { inputs } = useGlobalStore();
  const [graph, setGraph] = useState("graph");
  console.log(inputs);

  const data = columnDataFormat(inputs);
  console.log(data);

  console.log("ColumnGraph");

  return (
    <div className="graficacontainer">
      <Column {...configColumnGraph(data)} />
    </div>
  );
};
export default ColumnGraph;
