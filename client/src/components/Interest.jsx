import { useState } from "react";
import "./Interest.css";
import { TinyArea } from "@ant-design/plots";

const Interest = () => {
  const [capitalInicial, setCapitalInicial] = useState();
  const [tasaInteresAnual, setTasaInteresAnual] = useState();
  const [periodo, setPeriodo] = useState(12);
  const [reinversion, setReinversion] = useState();

  const compoundInterest = (rate, per, cap = 1, re) => {
    let mesProm = 30.416666667;

    let Per =
      per === 12
        ? mesProm
        : per === 4
        ? mesProm * 3
        : per === 2
        ? mesProm * 6
        : per === 1
        ? mesProm * 12
        : 1;

    let historyCap = [parseFloat(cap)];
    let reinvestment = re ? re : per;

    for (let i = 0; i < reinvestment; i++) {
      historyCap.push(
        historyCap[historyCap.length - 1] +
          (historyCap[historyCap.length - 1] * ((rate / 365) * Per)) / 100
      );
    }

    let TEA = (((historyCap[per] - cap) * 100) / cap).toFixed(2);
    let TE = (((historyCap[historyCap.length - 1] - cap) * 100) / cap).toFixed(
      2
    );
    return { historyCap, TEA, TE };
  };

  let newInt = compoundInterest(
    tasaInteresAnual,
    periodo,
    capitalInicial,
    reinversion
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
          <p className="level">◆ TNA: </p>
          <input
            className="interestInputs"
            type="number"
            placeholder="TNA %"
            value={tasaInteresAnual ? tasaInteresAnual : false}
            onChange={(e) => setTasaInteresAnual(e.target.value)}
          />
          <p className="level">◆ Periodo: </p>
          <div className="selectContainer">
            <button
              className={periodo === 365 ? "selected" : "select"}
              onClick={() => setPeriodo(365)}
            >
              Diario
            </button>
            <button
              className={periodo === 12 ? "selected" : "select"}
              onClick={() => setPeriodo(12)}
            >
              Mensual
            </button>
            <button
              className={periodo === 4 ? "selected" : "select"}
              onClick={() => setPeriodo(4)}
            >
              Trimestral
            </button>
            <button
              className={periodo === 2 ? "selected" : "select"}
              onClick={() => setPeriodo(2)}
            >
              Semestral
            </button>
            <button
              className={periodo === 1 ? "selected" : "select"}
              onClick={() => setPeriodo(1)}
            >
              Anual
            </button>
          </div>
          <p className="level">◆ Cantidad de reinversiones: (opcional)</p>
          <input
            className="interestInputs"
            type="number"
            placeholder="Automatico"
            value={reinversion ? reinversion : false}
            onChange={(e) => setReinversion(e.target.value)}
          />
          <p className="level">◆ Capital inicial:</p>
          <input
            className="interestInputs marginCero"
            type="number"
            placeholder="Capital"
            value={capitalInicial ? capitalInicial : false}
            onChange={(e) => setCapitalInicial(e.target.value)}
          />
        </div>
        <div className="calculadoraResultContainer">
          <div className="resultCenter">
            <div className="resultContainer">
              <h3 className="calculadoraTitleResult">
                Tasa Efectiva Anual (TEA)
              </h3>
              <p className="calculadoraTextResult">
                {newInt.TEA === "NaN" ? 0 : newInt.TEA}%
              </p>
            </div>
            <div className="resultContainer">
              <h3 className="calculadoraTitleResult">Incremento del capital</h3>
              <p className="calculadoraTextResult">
                {newInt.TE === "NaN" ? 0 : newInt.TE}%
              </p>
            </div>
            <div className="resultContainer">
              <h3 className="calculadoraTitleResult">Acumulacion</h3>
              <p className="calculadoraTextResult">
                $
                {capitalInicial === "NaN" || !capitalInicial
                  ? 0
                  : data[data.length - 1].toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <TinyArea {...config} className="tinyArea" />
    </div>
  );
};
export default Interest;
