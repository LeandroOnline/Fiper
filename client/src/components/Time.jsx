import { useEffect, useState } from "react";
import "./Time.css";

const Time = () => {
  const [timer, setTimer] = useState({});
  useEffect(() => {
    function obtenerHoraActual() {
      const date = new Date();
      const timeNow = {
        month: date.getMonth(),
        year: date.getFullYear(),
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

  const monthOnYear = [
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
  ];

  return (
    <div className="timeContainer">
      <p className="hour">
        {timer.hour?.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
        :
        {timer.minute?.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </p>
      <div className="divideVerticalTime"></div>

      <div className="inDay">
        <p >
          {daysOnWeek[timer.dayOnWeek - 1]} {timer.day}
        </p>
        <p >
          {monthOnYear[timer.month]} - {timer.year}
        </p>
      </div>
    </div>
  );
};
export default Time;
