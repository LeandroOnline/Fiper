import "./Grafica.css";
import { useEffect, useState } from "react";
// import { context } from "../contexts/Contexts";
import axiosGetAllInputs from "../api/axiosGetAllInputs";
import separe from "../helpers/separe";

//Chart
import Chart from "chart.js/auto";
import { LinearScale, CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useGlobalStore } from "../store/store";
Chart.register(LinearScale, CategoryScale);

const Grafica = () => {
  const [inputs, setInputs] = useState([]);
  console.log("se renderizo grafica")

  // let { reset } = useContext(context);
  const { reset } = useGlobalStore();

  const ingresos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const egresos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  separe(inputs, ingresos, egresos);
  
 
  useEffect(() => {
    axiosGetAllInputs().then((data) => setInputs(data));
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
