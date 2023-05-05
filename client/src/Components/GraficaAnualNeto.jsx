import "./Grafica.css";
import { useContext, useEffect, useState } from "react";
import { context } from "../App";
import { API } from "../utils/api";
import axios from "axios";
import moment from "moment";

//Chart
import Chart from "chart.js/auto";
import { LinearScale, CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";
Chart.register(LinearScale, CategoryScale);

const Grafica = () => {
  const [inputs, setInputs] = useState([]);
  const ingresos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const egresos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let { reset } = useContext(context);

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
            "Error al cargar los datos de la grafica2, contacte al administrador"
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
