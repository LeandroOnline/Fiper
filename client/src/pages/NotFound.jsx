import { Result } from "antd";
import { useNavigate } from "react-router-dom";
import search from "../assets/buscador.png";
import thanks from "../assets/gracias.png";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="maintenanceContainer">
      <img className="imgMessage" src={search} alt="" />
      <p>"Lo sentimos, pagina no encontrada"</p>
      <img className="gracias" src={thanks} alt="" />
      <button onClick={() => navigate("/")}>Back Home</button>
    </div>
  );
};
export default NotFound;
