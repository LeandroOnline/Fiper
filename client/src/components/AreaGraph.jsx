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

  const date = new Date();
  const month = date.getMonth();

  return (
    <div className="areacontainer">
      <div className="areaDatoContainer">
        <h1 className="datoIng-Egr">
          Monto NETO mes actual: {netPerMonth[month]}
        </h1>
      </div>
      <Area {...configAreaGraph(data)} className="netoContainer" />
    </div>
  );
};
export default AreaGraph;
