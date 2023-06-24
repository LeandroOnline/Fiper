import { useState } from "react";
import "./Interest.css";
import { TinyArea } from "@ant-design/plots";

const Interest = () => {
  const [capitalInicial, setCapitalInicial] = useState();
  const [tasaInteresAnual, setTasaInteresAnual] = useState();
  const [renovacion, setRenovacion] = useState();
  const [tiempo, setTiempo] = useState();

  const compoundInterest = (rate, ren, cap = 1, year = 1) => {
    let mesProm = 30.416666667;
    // para la renovacion debo calcular en cuanto divido el año para llegar al periodo
    // falta agregar para que se puedan calcular algunos dias y algunos meses nomas
    let per =
      renovacion === 12
        ? mesProm
        : renovacion === 4
        ? mesProm * 3
        : renovacion === 2
        ? mesProm * 6
        : renovacion === 1
        ? mesProm * 12
        : 1;

    let historyCap = [parseFloat(cap)];
    let Year = year && year !== "0" ? year : 1;
    for (let j = 0; j < Year; j++) {
      for (let i = 0; i < ren; i++) {
        historyCap.push(
          historyCap[historyCap.length - 1] +
            (historyCap[historyCap.length - 1] * ((rate / 365) * per)) / 100
        );
      }
    }
    let TEA = (((historyCap[ren] - cap) * 100) / cap).toFixed(2);
    let TE = (((historyCap[historyCap.length - 1] - cap) * 100) / cap).toFixed(
      2
    );
    return { historyCap, TEA, TE };
  };

  let newInt = compoundInterest(
    tasaInteresAnual,
    renovacion,
    capitalInicial,
    tiempo
  );

  const data = newInt.historyCap;
  const config = {
    autoFit: true,
    data,
    smooth: true,
    areaStyle: {
      fill: "hsl(218, 25%, 25%)",
    },
  };

  return (
    <div className="interescontainer" id="interest">
      <div className="interest">
        <div className="interestInputsContainer">
          <p className="level">◆ TNA: *</p>
          <input
            className="interestInputs"
            type="number"
            placeholder="TNA %"
            value={tasaInteresAnual ? tasaInteresAnual : false}
            onChange={(e) => setTasaInteresAnual(e.target.value)}
          />
          <p className="level">◆ Renovacion: *</p>
          <div className="selectContainer">
            <div className="select" onClick={() => setRenovacion(365)}>
              <div className="selectChoise"></div>
              Diario
            </div>
            <div className="select" onClick={() => setRenovacion(12)}>
              <div className="selectChoise"></div>
              Mensual
            </div>
            <div className="select" onClick={() => setRenovacion(4)}>
              <div className="selectChoise"></div>
              Trimestral
            </div>
            <div className="select" onClick={() => setRenovacion(2)}>
              <div className="selectChoise"></div>
              Semestral
            </div>
            <div className="select" onClick={() => setRenovacion(1)}>
              <div className="selectChoise"></div>
              Anual
            </div>
          </div>
          <p className="level">◆ Capital inicial:</p>
          <input
            className="interestInputs"
            type="number"
            placeholder="Capital"
            value={capitalInicial ? capitalInicial : false}
            onChange={(e) => setCapitalInicial(e.target.value)}
          />
          <p className="level">◆ Cantidad de años:</p>
          <input
            className="interestInputs"
            type="number"
            placeholder="Años"
            value={tiempo ? tiempo : false}
            onChange={(e) => setTiempo(e.target.value)}
          />
        </div>
        <div className="calculadoraTexts">
          <p className="calculadoraTextResult">
            Total Acumulado= $
            {data[data.length - 1] === "NaN"
              ? 0
              : data[data.length - 1].toFixed(2)}
          </p>
          <p className="calculadoraTextResult">
            TEA= {newInt.TEA === "NaN" ? 0 : newInt.TEA}%
          </p>
          <p className="calculadoraTextResult">
            TE= {newInt.TE === "NaN" ? 0 : newInt.TE}%
          </p>
        </div>
      </div>
      <TinyArea {...config} className="tinyArea" />
    </div>
  );
};
export default Interest;
