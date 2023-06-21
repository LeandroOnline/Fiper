import { memo } from "react";
import "./ProfitAndLoss.css";
import useGlobalStore from "../store/Store";
import { Pie } from "@ant-design/plots";
import totalNeto from "../helpers/totalNeto";
import Time from "./Time";

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
    appendPadding: 8,
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
        <div className="profitAndLosse">
          <h1 className="profitAndLosseTitle">Total: </h1>
          <p className="profitAndLosseResult">
            ${inputs ? totalNeto(inputs) : "0"}
          </p>
        </div>
        <div className="divideVertical"></div>
        <div className="profitAndLosse">
          <h1 className="profitAndLosseTitle">Ganancias: </h1>
          <p className="profitAndLosseResult">
            ${profits ? total(profits) : "0"}
          </p>
        </div>
        <div className="divideVertical"></div>

        <div className="profitAndLosse">
          <h1 className="profitAndLosseTitle">Gastos: </h1>
          <p className="profitAndLosseResult">
            ${losses ? total(losses) : "0"}
          </p>
        </div>
        <Time/>
      {/* <Pie {...config} className="pie" /> */}
    </div>
  );
});
export default Total;
