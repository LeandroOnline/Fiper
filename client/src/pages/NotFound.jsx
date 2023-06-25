import { useNavigate } from "react-router-dom";
import "./NoFound.css";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="maintenanceContainer">
      <h1>"Lo sentimos, pagina no encontrada"</h1>
      <button className="buttonNotFound" onClick={() => navigate("/")}>Back Home</button>
    </div>
  );
};
export default NotFound;
