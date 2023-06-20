import { useEffect, useState } from "react";
import useGlobalStore from "../store/Store";

import "./Difference.css";
import porcentaje2 from "../assets/porcentaje2.png";

const ProfitsAndLosses = () => {
  const profits = useGlobalStore((state) => state.profits);
  const [profitsIncrement, setProfitsIncrement] = useState(0);

  const porcentProfits = (profits) => {
    const lastMonth = profits[profits.length - 1];
    const previousMonth = profits[profits.length - 2];
    let difference = lastMonth - previousMonth;
    let porcentajeIncremento = (difference / previousMonth) * 100;
    return porcentajeIncremento;
  };

  useEffect(() => {
    setProfitsIncrement(porcentProfits(profits));
    // setProfitsIncrement(porcentProfits([1000, 1500, 3000]));
  }, [profits]);

  return (
    <div className="ProfitsAndLossesContainer">
      <img src={porcentaje2} alt="" />
      <div className="difference">
        <h1>Diferencia: </h1>
        <h2
          className={
            profitsIncrement
              ? profitsIncrement > 0
                ? "porcentPositive"
                : "porcentNegative"
              : "porcentPositive"
          }
        >
          {profitsIncrement
            ? profitsIncrement >= 0
              ? "+%" + profitsIncrement
              : "-%" + profitsIncrement * -1
            : "0%"}
        </h2>
        <h3>En relacion al mes anterior</h3>
      </div>
    </div>
  );
};
export default ProfitsAndLosses;
