import { useState } from "react";
import useGlobalStore from "../store/Store";
import totalNeto from "../helpers/totalNeto";
import "./Interest.css";
import interes from "../assets/interes.png";

const Interest = () => {
  //   const inputs = useGlobalStore((state) => state.inputs);
  //   const totalEnUSD = (totalNeto(inputs) / dolar).toFixed(2);
  const [capitalInicial, setCapitalInicial] = useState();
  const [tasaInteresAnual, setTasaInteresAnual] = useState();
  const [periodos, setPeriodos] = useState();
  const [tiempo, setTiempo] = useState();

  function calcularInteresCompuesto(
    capitalInicial,
    tasaInteres,
    periodos,
    tiempo
  ) {
    const tasaInteresDecimal = tasaInteres / 100;
    const factorCapitalizacion = 1 + tasaInteresDecimal / periodos;
    const totalAcumulado =
      capitalInicial * Math.pow(factorCapitalizacion, periodos * tiempo);
    return totalAcumulado.toFixed(2);
  }

  const total = calcularInteresCompuesto(
    capitalInicial,
    tasaInteresAnual,
    periodos,
    tiempo
  );
  console.log("Total acumulado:", total);

  return (
    <div className="interescontainer">
      <img className="interesImg" src={interes} alt="" />
      <p className="calculadoraText">Calculadora de Interes Compuesto</p>
      <div className="interest">
        <div className="interestInputsContainer">
          <div className="columns">
            <input
              className="interestInputs"
              type="text"
              placeholder="Cap. inicial"
              value={capitalInicial ? capitalInicial : ""}
              onChange={(e) => setCapitalInicial(e.target.value)}
            />
            <input
              className="interestInputs"
              type="text"
              placeholder="Cant. x Año"
              value={periodos ? periodos : ""}
              onChange={(e) => setPeriodos(e.target.value)}
            />
          </div>
          <div className="columns">
            <input
              className="interestInputs"
              type="text"
              placeholder="TNA %"
              value={tasaInteresAnual ? tasaInteresAnual : ""}
              onChange={(e) => setTasaInteresAnual(e.target.value)}
            />
            <input
              className="interestInputs"
              type="text"
              placeholder="Años"
              value={tiempo ? tiempo : ""}
              onChange={(e) => setTiempo(e.target.value)}
            />
          </div>
        </div>
        <p>={total}</p>
      </div>
    </div>
  );
};
export default Interest;
