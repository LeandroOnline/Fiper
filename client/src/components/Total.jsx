import { memo, useState } from "react";
import "./Total.css";
import useGlobalStore from "../store/Store";
import totalNeto from "../helpers/totalNeto.js";
import ahorro from "../assets/ahorro.png";

const Total = memo(() => {
  const inputs = useGlobalStore((state) => state.inputs);

  return (
    <div className="totalcontainer">
      <img className="totalimg" src={ahorro} alt="" />
      <div>
        <h1>Total: </h1>
        <p className="usd">${inputs ? totalNeto(inputs) : null}</p>
      </div>
    </div>
  );
});
export default Total;
