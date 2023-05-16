import "./AreaGraph.css";
import { Area } from "@ant-design/plots";
import useGlobalStore from "../store/Store";
import areaDataFormat from "../helpers/areaDataFormat";
import configAreaGraph from "../utils/configAreaGraph";
import { useEffect } from "react";

const AreaGraph = () => {
  const { inputs, setNetPerMonth } = useGlobalStore();
  const { data, netPerMonth } = areaDataFormat(inputs);

  useEffect(() => {
    setNetPerMonth(netPerMonth);
  }, [inputs]);

  return (
    <div className="areacontainer">
      <Area {...configAreaGraph(data)} />
    </div>
  );
};
export default AreaGraph;
