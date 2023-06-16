import { memo } from "react";
import "./Total.css";
import useGlobalStore from "../store/Store";
import totalNeto from "../helpers/totalNeto.js";
import { Pie } from "@ant-design/plots";

const Total = memo(() => {
  const inputs = useGlobalStore((state) => state.inputs);
  const losses = useGlobalStore((state) => state.losses);
  const profits = useGlobalStore((state) => state.profits);

  const total = (profits) => {
    let total = 0;
    profits.forEach((prof) => (total += prof));
    return total;
  };

  const data = [
    {
      type: "Ingresos",
      value: total(profits),
    },
    {
      type: "Egresos",
      value: total(losses),
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  return (
    <div className="totalcontainer">
      {/* <img className="totalimg" src={ahorro} alt="" /> */}
      <Pie {...config} />
      <div>
        <h1>Total: </h1>
        <p className="usd">${inputs ? totalNeto(inputs) : null}</p>
      </div>
    </div>
  );
});
export default Total;
