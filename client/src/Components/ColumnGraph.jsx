import "./ColumnGraph.css";
import columnDataFormat from "../helpers/columnDataFormat";
import { Column } from "@ant-design/plots";
import useGlobalStore from "../store/Store";
import configColumnGraph from "../utils/configColumnGraph";

const ColumnGraph = () => {
  const { inputs } = useGlobalStore();
  const data = columnDataFormat(inputs);
  console.log("ColumnGraph");

  return (
    <div className="graficacontainer">
      <Column {...configColumnGraph(data)} />
    </div>
  );
};
export default ColumnGraph;
