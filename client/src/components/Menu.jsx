import "./Menu.css";
import inicio from "../assets/inicio.png";
import nota from "../assets/nota.png";
import interes from "../assets/interes.png";
import estadistica from "../assets/estadistica.png";
import dividir from "../assets/dividir.png";
import persona from "../assets/persona.png";

const Menu = () => {
  return (
    <div className="menuContainer">
      <a href="#home">
        <div className="menuItem">
          <img src={inicio} className="menuItemImg" alt="ini" />
          <p className="menuItemText">Inicio</p>
        </div>
      </a>
      <a href="#notes">
        <div className="menuItem">
          <img src={nota} className="menuItemImg" alt="not" />
          <p className="menuItemText">Notas</p>
        </div>
      </a>
      <a href="#interest">
        <div className="menuItem">
          <img src={interes} className="menuItemImg" alt="int" />
          <p className="menuItemText">Intereses</p>
        </div>
      </a>
      <a href="#graphs">
        <div className="menuItem">
          <img src={estadistica} className="menuItemImg" alt="est" />
          <p className="menuItemText">Grafica</p>
        </div>
      </a>
      <a href="#divide">
        <div className="menuItem">
          <div className="dividirContainer">
            <img src={dividir} className="dividir" alt="est" />
            <img src={persona} className="persona1" alt="est" />
            <img src={persona} className="persona2" alt="est" />
          </div>
          <p className="menuItemText">Dividir</p>
        </div>
      </a>
    </div>
  );
};
export default Menu;

{
  /* <DivBody id='about'> */
}
{
  /* <a onClick={() => setOpen(false)} href="#home">
Home
</a> */
}
