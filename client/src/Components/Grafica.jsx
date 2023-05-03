import "./Grafica.css";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { LinearScale, CategoryScale } from "chart.js";
import { useContext, useEffect, useState } from "react";
import { context } from "../App";
import axios from "axios";
import {API} from "../App";
Chart.register(LinearScale, CategoryScale);

const Grafica = () => {
  const [inputs, setInputs] = useState([]);
  // const [ingresos, setIngresos] = useState(0);
  // const [egresos, setEgresos] = useState(0);
  const ingresos = [];
  const egresos = [];
  let { reset } = useContext(context);

  const result = () => {
    inputs.map((element) => {
      if (element.input >= 0) {
        ingresos.push(element.input);
      } else {
        egresos.push(element.input);
      }
    });
  };
  result();

  useEffect(() => {
    const get = async () =>
      await axios
        .get(API + "/get", {
          withCredentials: true,
        })
        .then((data) => setInputs(data.data))
        .catch((err) => {
          console.log(err);
          window.alert("Error en la grafica, contacte al administrador");
        });
    get();
  }, [reset]);

  const data = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        label: "Ingresos",
        data: ingresos,
        backgroundColor: "rgba(75,192,192,1)",
      },
      {
        label: "Egresos",
        data: egresos,
        backgroundColor: "rgba(255,99,132,1)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="graficacontainer">
      <Bar data={data} options={options} />
    </div>
  );
};
export default Grafica;
