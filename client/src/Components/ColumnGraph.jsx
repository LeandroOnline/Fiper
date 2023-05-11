import "./ColumnGraph.css";
import { useState } from "react";
import columnDataFormat from "../helpers/columnDataFormat";
import { Column } from "@ant-design/plots";
import useGlobalStore from "../store/Store";
import configColumnGraph from "../utils/configColumnGraph";

const ColumnGraph = () => {
  const { inputs } = useGlobalStore();
  const [graph, setGraph] = useState("graph");

  const data = columnDataFormat(inputs);
  console.log(inputs);

  console.log("ColumnGraph");
  const config = configColumnGraph(data);


  return (
    <div className="graficacontainer">
      <Column {...config} />
    </div>
  );
};
export default ColumnGraph;
