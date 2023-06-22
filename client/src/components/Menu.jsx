import "./Menu.css";
import inicio from "../assets/inicio.png";
import nota from "../assets/nota.png";
import interes from "../assets/interes.png";
import estadistica from "../assets/estadistica.png";
import dividir from "../assets/dividir.png";
import persona from "../assets/persona.png";
import { useState } from "react";

const Menu = () => {
  const [position, setPosition] = useState("home");
  return (
    <div className="menuContainer">
      <a href="#home">
        <div
          className={position === "home" ? "pressed" : "menuItem"}
          onClick={() => setPosition("home")}
        >
          <img src={inicio} className="menuItemImg" alt="ini" />
          <p className="menuItemText">Inicio</p>
        </div>
      </a>
      <a href="#notes">
        <div
          className={position === "notes" ? "pressed" : "menuItem"}
          onClick={() => setPosition("notes")}
        >
          <img src={nota} className="menuItemImg" alt="not" />
          <p className="menuItemText">Notas</p>
        </div>
      </a>
      <a href="#interest">
        <div
          className={position === "interest" ? "pressed" : "menuItem"}
          onClick={() => setPosition("interest")}
        >
          <img src={interes} className="menuItemImg" alt="int" />
          <p className="menuItemText">Intereses</p>
        </div>
      </a>
      <a href="#graphs">
        <div
          className={position === "graphs" ? "pressed" : "menuItem"}
          onClick={() => setPosition("graphs")}
        >
          <img src={estadistica} className="menuItemImg" alt="est" />
          <p className="menuItemText">Grafica</p>
        </div>
      </a>
      <a href="#divide">
        <div
          className={position === "divide" ? "pressed" : "menuItem"}
          onClick={() => setPosition("divide")}
        >
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
