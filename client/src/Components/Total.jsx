import { useEffect, useState } from "react";
import "./Total.css";
import useGlobalStore from "../store/Store";
import axiosGetAllInputs from "../api/axiosGetAllInputs";

const Total = () => {
  const [porcent, setPorcent] = useState();
  const inputs = useGlobalStore((state) => state.inputs);
  const setInputs = useGlobalStore((state) => state.setInputs);

  // si saco el setInputs entonces no activo el setInputs
  useEffect(() => {
    const get = async () =>
      await axiosGetAllInputs().then((response) => setInputs(response));
      get();
  }, []);

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
      <h1>Total: {inputs?total():null}</h1>
      <div className="porcentcontainer">
        <p>%</p>
        <input type="number" placeholder="xxx" onChange={(e) => Porcent(e)} />
        <p>={porcent}</p>
      </div>
    </div>
  );
};
export default Total;
