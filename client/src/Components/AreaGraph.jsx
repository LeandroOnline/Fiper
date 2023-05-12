import "./AreaGraph.css";
import { Area } from "@ant-design/plots";
import useGlobalStore from "../store/Store";
import areaDataFormat from "../helpers/areaDataFormat";
import configAreaGraph from "../utils/configAreaGraph";

const AreaGraph = () => {
  const { inputs } = useGlobalStore();
  const data = areaDataFormat(inputs);

  return (
    <div className="areacontainer">
      <Area {...configAreaGraph(data)} />
    </div>
  );
};
export default AreaGraph;
