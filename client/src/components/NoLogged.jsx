import plan_de_negocios from "../assets/plan-de-negocios.png";
import analisis from "../assets/analisis.png";
import documento from "../assets/documento.png";
import ganancia from "../assets/ganancia.png";
import capture from "../assets/capture.png";
import { Link } from "react-router-dom";
import "./NoLogged.css";

const NoLogged = () => {
  return (
    <div className="noLogged">
      <div className="grid">
        <Link to="/login" className="IniciaSesion">
          Inicia sesion para visualizar el DashBoard
        </Link>
        <p className="initialText">
          Encuentra el equilibrio perfecto entre tus sueños y tus metas
          financieras con esta plataforma intuitiva y poderosa. Aquí, puedes
          tomar el control total de tus finanzas y trazar un camino claro hacia
          la estabilidad y la prosperidad.
        </p>
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

        <img src={capture} className="capture" alt="capture" />
        <Link to="/login" className="IniciaSesion">
          Inicia sesion
        </Link>
      </div>
    </div>
  );
};
export default NoLogged;
