import "./Menu.css";
import inicio from "../assets/inicio.png";
import nota from "../assets/nota.png";
import interes from "../assets/interes.png";
import estadistica from "../assets/estadistica.png";
import dividir from "../assets/dividir.png";
import persona from "../assets/persona.png";
import { useState } from "react";

import { Link } from "react-scroll";

const Menu = () => {
  const [position, setPosition] = useState("home");
  return (
    <div className="menuContainer">
      <Link
        to="home"
        spy={true}
        smooth={true}
        onSetActive={() => setPosition("home")}
        offset={-90}
        duration={500}
      >
        <div className={position === "home" ? "pressed" : "menuItem"}>
          <img src={inicio} className="menuItemImg" alt="ini" />
          <p className="menuItemText">Inicio</p>
        </div>
      </Link>
      <Link
        to="notes"
        spy={true}
        smooth={true}
        onSetActive={() => setPosition("notes")}
        offset={-90}
        duration={500}
      >
        <div className={position === "notes" ? "pressed" : "menuItem"}>
          <img src={nota} className="menuItemImg" alt="not" />
          <p className="menuItemText">Notas</p>
        </div>
      </Link>
      <Link
        to="interest"
        spy={true}
        smooth={true}
        onSetActive={() => setPosition("interest")}
        offset={-90}
        duration={500}
      >
        <div className={position === "interest" ? "pressed" : "menuItem"}>
          <img src={interes} className="menuItemImg" alt="int" />
          <p className="menuItemText">Intereses</p>
        </div>
      </Link>
      <Link
        to="graphs"
        spy={true}
        smooth={true}
        onSetActive={() => setPosition("graphs")}
        offset={-90}
        duration={500}
      >
        <div className={position === "graphs" ? "pressed" : "menuItem"}>
          <img src={estadistica} className="menuItemImg" alt="est" />
          <p className="menuItemText">Graficos</p>
        </div>
      </Link>
      <Link
        to="divide"
        spy={true}
        smooth={true}
        onSetActive={() => setPosition("divide")}
        offset={-90}
        duration={500}
      >
        <div className={position === "divide" ? "pressed" : "menuItem"}>
          <div className="dividirContainer">
            <img src={dividir} className="dividir" alt="est" />
            <img src={persona} className="persona1" alt="est" />
            <img src={persona} className="persona2" alt="est" />
          </div>
          <p className="menuItemText">Dividir</p>
        </div>
      </Link>
    </div>
  );
};
export default Menu;
