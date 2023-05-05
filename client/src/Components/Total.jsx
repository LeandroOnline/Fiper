import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { context } from "../contexts/Contexts";
import "./Total.css";
import { API } from "../utils/api";

const Total = () => {
  const [total, setTotal] = useState([]);
  const [porcent, setPorcent] = useState();
  let { reset } = useContext(context);

  const result = () => {
    let value = 0;
    total.map((element) => (value += element.input));
    return value;
  };

  useEffect(() => {
    const get = async () =>
      await axios
        .get(API + "/getall", { withCredentials: true })
        .then((data) => setTotal(data.data))
        .catch((err) => {
          console.log(err.response.data);
          window.alert(
            "Error al pedir los datos del servidor, contacte al administrador"
          );
        });
    get();
  }, [reset]);

  const Porcent = (e) => {
    const total = result();
    const porcent = e.target.value;
    const subtotal = (porcent * total) / 100;
    setPorcent(subtotal);
  };

  return (
    <div className="totalcontainer">
      <h1>Total: {result()}</h1>
      <div className="porcentcontainer">
        <p>%</p>
        <input type="number" placeholder="xxx" onChange={(e) => Porcent(e)} />
        <p>={porcent}</p>
      </div>
    </div>
  );
};
export default Total;
