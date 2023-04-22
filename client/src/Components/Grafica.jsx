import "./Grafica.css";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { LinearScale, CategoryScale } from 'chart.js';

Chart.register(LinearScale, CategoryScale);

const Grafica = () => {
  const data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
    datasets: [
      {
        label: "Ventas",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(75,192,192,1)",
      },
      {
        label: "Gastos",
        data: [5, 10, 8, 3, 7, 4],
        backgroundColor: "rgba(255,99,132,1)",
      }
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
