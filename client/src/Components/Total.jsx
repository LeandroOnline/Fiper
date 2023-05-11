import { memo, useState } from "react";
import "./Total.css";
import useGlobalStore from "../store/Store";

const Total = memo(() => {
  const [porcent, setPorcent] = useState();
  const inputs = useGlobalStore((state) => state.inputs);

  const total = () => {
    let value = 0;
    inputs.map((element) => (value += element.input));
    return value;
  };

  const Porcent = (e) => {
    const total = result();
    const porcent = e.target.value;
    const subtotal = (porcent * total) / 100;
    setPorcent(subtotal);
  };

  console.log("Total");

  return (
    <div className="totalcontainer">
      <h1>Total: {inputs ? total() : null}</h1>
      <div className="porcentcontainer">
        <p>%</p>
        <input type="number" placeholder="xxx" onChange={(e) => Porcent(e)} />
        <p>={porcent}</p>
      </div>
    </div>
  );
});
export default Total;
