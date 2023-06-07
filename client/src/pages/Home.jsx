import AreaGraph from "../components/AreaGraph";
import ColumnGraph from "../components/ColumnGraph";
import Input from "../components/Input";
import ListInputs from "../components/ListInputs";
import Total from "../components/Total";
import useGlobalStore from "../store/Store";
import "./Home.css";
import DolarBlue from "../components/DolarBlue";
import Interest from "../components/Interest";
import ProfitsAndLosses from "../components/ProfitsAndLosses";

import plan_de_negocios from "../assets/plan-de-negocios.png";
import analisis from "../assets/analisis.png";
import documento from "../assets/documento.png";
import ganancia from "../assets/ganancia.png";
import capture from "../assets/capture.png";

const Home = () => {
  const login = useGlobalStore((state) => state.login);

  return (
    <div className="homecontainer">
      {login ? (
        <>
          <div className="inputsGraph">
            <div className="inputTotal">
              <Input />
              <Total />
            </div>

            <div className="graphs">
              <ColumnGraph />
              <AreaGraph />
            </div>
          </div>
          <div className="tinys">
            <ProfitsAndLosses />
            <DolarBlue />
            <Interest />
          </div>
          <ListInputs />
        </>
      ) : (
        <div className="noLogged">
          <div className="grid">
            <p>Usuario no Logueado, inicia sesion para empezar</p>
            <img src={capture} className="capture" alt="capture" />
            <div className="Utilities">
              <p className="subtitle"> Crea tu plan de negocios</p>
              <img className="planDeNegocios" src={plan_de_negocios} alt="" />
            </div>
            <div className="Utilities">
              <p className="subtitle"> Analiza y optimiza tus ingresos</p>
              <img className="planDeNegocios" src={analisis} alt="" />
            </div>
            <div className="Utilities">
              <p className="subtitle"> Organiza ganancias y gastos</p>
              <img className="planDeNegocios" src={documento} alt="" />
            </div>
            <div className="Utilities">
              <p className="subtitle"> Calcula interes compuesto</p>
              <img className="planDeNegocios" src={ganancia} alt="" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
