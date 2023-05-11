import "./Grafica.css";
import { useEffect } from "react";
import separe from "../helpers/separe";

//Chart

import useGlobalStore from "../store/Store";
const Grafica = () => {
  const { ingresos, egresos, inputs } = useGlobalStore();

  separe(inputs, ingresos, egresos);

  useEffect(() => {}, [inputs]);
  console.log(inputs);

  // como la recibo desde el back
  // [{date,detalle,input,tipo},{}]

  // como debo pasar la info
  // {
  //   name: 'Berlin',
  //   月份: 'Jan.',
  //   月均降雨量: 12.4,
  // }
  // [ 264, 412, 492, 467, 513, 546, 983, 340, 539, 243, 226, 192]
  // {
  //   "timePeriod": "2006 Q4",
  //   "value": 1.08
  // },

  console.log("GraficaMix");

  return (
    <div className="graficacontainer">
      {/* <Bar data={data} options={options} /> */}
    </div>
  );
};
export default Grafica;
