import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { context } from "../App";
import "./Total.css";
import {API} from '../App';

const Total = () => {
  const [total, setTotal] = useState([]);
  let { reset } = useContext(context);

  const result = () => {
    let value = 0;
    total.map((element) => (value += element.input));
    return value;
  };

  useEffect(() => {
    const get = async () =>
      await axios
        .get(API + "/getall" ,{withCredentials: true})
        .then((data) => setTotal(data.data))
        .catch((err) => {
          console.log(err);
          window.alert(
            "Error al pedir los datos del servidor, contacte al administrador"
          );
        });
    get();
  }, [reset]);

  return <div className="totalcontainer">Total: {result()}</div>;
};
export default Total;
