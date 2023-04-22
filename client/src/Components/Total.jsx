import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { context } from "../App";
import "./Total.css";
const API = "http://localhost:3000/api";

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
      await axios.get(API + "/getall").then((data) => setTotal(data.data));
    get();
  }, [reset]);

  return <div className="totalcontainer">Total: {result()}</div>;
};
export default Total;
