import { useState } from "react";
import useGlobalStore from "../store/Store";
import totalNeto from "../helpers/totalNeto";
import "./Interest.css";
import interes from "../assets/interes.png";

const Interest = () => {
  const [capitalInicial, setCapitalInicial] = useState();
  const [tasaInteresAnual, setTasaInteresAnual] = useState();
  const [periodos, setPeriodos] = useState();
  const [tiempo, setTiempo] = useState();

  function calcularInteresCompuesto(
    capitalInicial,
    tasaInteres,
    periodos = 1,
    tiempo = 1
  ) {
    let totalAcumulado = 0;
    let tasaInteresDecimal = tasaInteres / 100;
    if (tiempo) {
      const tasaInteresDecimal = tasaInteres / 100;
      const factorCapitalizacion = 1 + tasaInteresDecimal / periodos;
      totalAcumulado =
        capitalInicial * Math.pow(factorCapitalizacion, periodos * tiempo);
    } else {
      const tasaInteresMensual = tasaInteresAnual / 12 / 100;
      totalAcumulado =
        capitalInicial * Math.pow(1 + tasaInteresMensual, periodos);
    }

    // Cálculo de la Tasa Efectiva Anual (TEA)
    const TEA =
      (Math.pow(1 + tasaInteresDecimal / periodos, periodos) - 1) * tiempo;

    return {
      totalAcumulado: totalAcumulado.toFixed(2),
      TEA: (TEA * 100).toFixed(2),
    };
  }

  const { totalAcumulado, TEA } = calcularInteresCompuesto(
    capitalInicial,
    tasaInteresAnual,
    periodos,
    tiempo
  );

  return (
    <div className="interescontainer" id="interest">
      <img className="interesImg" src={interes} alt="" />
      <p className="calculadoraText">Calculadora de Interes Compuesto</p>
      <div className="interest">
        <div className="interestInputsContainer">
            <input
              className="interestInputs"
              type="text"
              placeholder="Capital"
              value={capitalInicial ? capitalInicial : ""}
              onChange={(e) => setCapitalInicial(e.target.value)}
            />
            <input
              className="interestInputs"
              type="text"
              placeholder="Renovacion / Meses"
              value={periodos ? periodos : ""}
              onChange={(e) => setPeriodos(e.target.value)}
            />

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
      <p className="calculadoraTextResult">
        Total Acumulado= ${totalAcumulado === "NaN" ? 0 : totalAcumulado}
      </p>
      <p className="calculadoraTextResult">TEA= {TEA === "NaN" ? 0 : TEA}%</p>
      <p className="calculadoraTextResult">
        Tasa efectiva mensual=
        {TEA === "NaN" ? 0 : (tasaInteresAnual / 12).toFixed(2)}%
      </p>
    </div>
  );
};
export default Interest;
