import "./Maintenance.css";
import working from "../assets/trabajando.png"
import thanks from "../assets/gracias.png"
const Maintenance = () => {
  return (
    <div className="maintenanceContainer">
      <img src={working} alt="" />
      <p>Estamos en mantenimiento para que tenga una mejor experiencia, por favor ingrese luego.</p>
      <img className="gracias" src={thanks} alt="" />
    </div>
  )
}
export default Maintenance