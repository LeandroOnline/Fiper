import { useEffect, useState } from "react";
import "./Time.css";

const Time = () => {
  const [timer, setTimer] = useState({});
  const espacio = ` ${" "}`;
  useEffect(() => {
    function obtenerHoraActual() {
      const date = new Date();
      const timeNow = {
        dayOnWeek: date.getDay(),
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
      };
      setTimer(timeNow);
    }
    const intervaloID = setInterval(obtenerHoraActual, 1000);
    return () => {
      clearInterval(intervaloID);
    };
  }, []);

  const daysOnWeek = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];

  return (
    <div className="timeContainer">
      <p className="inWeek">
        {daysOnWeek[timer.dayOnWeek - 1]} {timer.day}
      </p>
      <p className="hour">
        {timer.hour}:{timer.minute}
      </p>

    </div>
  );
};
export default Time;
