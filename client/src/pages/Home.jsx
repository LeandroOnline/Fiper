import { Link } from "react-router-dom";

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
          <Link to="/login" className="IniciaSesion">
            Inicia sesion para visualizar el DashBoard
          </Link>
            <div className="Utilities">
              <p className="subtitle"> Crea</p>
              <img className="planDeNegocios" src={plan_de_negocios} alt="" />
            </div>
            <div className="Utilities">
              <p className="subtitle"> Analiza</p>
              <img className="planDeNegocios" src={analisis} alt="" />
            </div>
            <div className="Utilities">
              <p className="subtitle"> Organiza</p>
              <img className="planDeNegocios" src={documento} alt="" />
            </div>
            <div className="Utilities">
              <p className="subtitle"> Calcula</p>
              <img className="planDeNegocios" src={ganancia} alt="" />
            </div>
            <p className="initialText">
              Encuentra el equilibrio perfecto entre tus sueños y tus metas
              financieras con esta plataforma intuitiva y poderosa. Aquí, puedes
              tomar el control total de tus finanzas y trazar un camino claro
              hacia la estabilidad y la prosperidad.
            </p>
            <img src={capture} className="capture" alt="capture" />
            <Link to="/login" className="IniciaSesion">
              Inicia sesion
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
