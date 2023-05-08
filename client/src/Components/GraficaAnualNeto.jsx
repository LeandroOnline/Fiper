import "./Grafica.css";
import { useContext, useEffect, useState } from "react";
import { context } from "../contexts/Contexts";
import moment from "moment";
import axiosGetAllInputs from "../api/axiosGetAllInputs";


//Chart
import Chart from "chart.js/auto";
import { LinearScale, CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";
Chart.register(LinearScale, CategoryScale);

const Grafica = () => {
  const [inputs, setInputs] = useState([]);
  let { reset } = useContext(context); // cuando el valor de reset cambie se vuelve a renderizar el componente
  const ingresos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const egresos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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

  const neto = () => {
    const result = [];
    for (let i = 0; i < inputs.length; i++) {
      result.push(ingresos[i] - egresos[i]);
    }
    return result;
  };

  axiosGetAllInputs().then((data) => setInputs(data));

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
        label: "Neto",
        data: neto(),
        borderColor: "rgb(192, 75, 161)",
        backgroundColor: "rgb(192, 75, 161)",
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
      <Line data={data} options={options} />
    </div>
  );
};
export default Grafica;
