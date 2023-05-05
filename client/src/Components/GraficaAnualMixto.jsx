import "./Grafica.css";
import { useContext, useEffect, useState } from "react";
import { context } from "../App";
import { API } from "../utils/api";
import axios from "axios";
import moment from "moment";

//Chart
import Chart from "chart.js/auto";
import { LinearScale, CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";
Chart.register(LinearScale, CategoryScale);

const Grafica = () => {
  const [inputs, setInputs] = useState([]);
  let { reset, ingresos, egresos } = useContext(context);

  const result = () => {
    inputs.map((element) => {
      if (element.input >= 0) {
        let date = moment(element.date);
        ingresos[date.month()] += element.input;
      } else {
        let date = moment(element.date);
        egresos[date.month()] += element.input * -1;
      }
    });
  };
  result();

  useEffect(() => {
    const get = async () =>
      await axios
        .get(API + "/getall", {
          withCredentials: true,
        })
        .then((data) => setInputs(data.data))
        .catch((err) => {
          console.log(err);
          window.alert(
            "Error al cargar los datos de la grafica, contacte al administrador"
          );
        });
    get();
  }, [reset]);

  // Chart
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
