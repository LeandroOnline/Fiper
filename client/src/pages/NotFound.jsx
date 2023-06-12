import { useNavigate } from "react-router-dom";
import search from "../assets/buscador.png";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="maintenanceContainer">
      <img className="imgMessage" src={search} alt="" />
      <p>"Lo sentimos, pagina no encontrada"</p>
      <button className="buttonNotFound" onClick={() => navigate("/")}>Back Home</button>
    </div>
  );
};
export default NotFound;
