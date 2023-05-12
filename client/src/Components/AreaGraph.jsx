import { Area } from "@ant-design/plots";
import "./AreaGraph.css";
import useGlobalStore from "../store/Store";
import areaDataFormat from "../helpers/areaDataFormat";

const AreaGraph = () => {
  const { inputs } = useGlobalStore();
  const data = areaDataFormat(inputs);
  const config = {
    data,
    xField: "timePeriod",
    yField: "value",
    xAxis: {
      range: [0, 1],
    },
  };
  return (
    <div className="areacontainer">
      <Area {...config} />
    </div>
  );
};
export default AreaGraph;
