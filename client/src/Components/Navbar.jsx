import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import useGlobalStore from "../store/Store";
import axiosDeleteUser from "../api/axiosDeleteUser";
import { memo, useState } from "react";
import { shallow } from "zustand/shallow";

import flechas from "../assets/flechas.png";
import flechasizq from "../assets/flechaizq.png";
import config from "../assets/configuracion.png";

const Navbar = memo(() => {
  const [menu, setMenu] = useState(true);
  const [configIsOpen, setConfigIsOpen] = useState(false);
  const [password, setPassword] = useState(false);
  const { setLogin, login } = useGlobalStore(
    (state) => ({
      setLogin: state.setLogin,
      login: state.login,
    }),
    shallow
  );
  const navigate = useNavigate();

  const deleteUser = async () => {
    if (window.confirm("Seguro desea eliminar el usuario y sus entradas?")) {
      await axiosDeleteUser().then(() => {
        window.alert("Usuario eliminado");
        setLogin(null);
      });
    }
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setLogin(null);
    navigate("/login");
  };

  const changePassword = (currentPassword, newPassword) => {
    setPassword(false);
  };

  return (
    <div className="navcontainer">
      <div className="menu">
        <p
          className={menu ? "title" : "titleTransparent"}
          onClick={() => setMenu(!menu)}
        >
          FIPE
          {menu ? (
            <img className="menuflechas" src={flechasizq} alt="" />
          ) : (
            <img className="menuflechas" src={flechas} alt="" />
          )}
        </p>
        <div className={menu ? "blur" : "hide"}></div>
        <Link to="/" className={menu ? "navbutton" : "hide"}>
          DashBoard
        </Link>
        {login ? (
          <>
            <div
              onClick={() => {
                menu ? logout() : null;
              }}
              className={menu ? "navbutton" : "hide"}
            >
              Salir
            </div>
            <img
              src={config}
              alt=""
              className={menu ? "config" : "hide"}
              onClick={() => setConfigIsOpen(!configIsOpen)}
            />
          </>
        ) : (
          <>
            <Link to="/login" className={menu ? "navbutton" : "hide"}>
              Entrar
            </Link>
            <Link to="/signup" className={menu ? "navbutton" : "hide"}>
              Registrarse
            </Link>
          </>
        )}
      </div>

      <div className={configIsOpen ? "configmerge" : "configclose"}>
        <div
          className={menu ? "navbutton" : "hide"}
          onClick={() => (password ? null : setPassword(true))}
        >
          {password ? (
            <div className="newPasswordContainer">
              <input
                type="text"
                className="newpassword"
                placeholder="Contraseña Actual.."
              />
              <input
                type="text"
                className="newpassword"
                placeholder="Contraseña Nueva.."
              />
              <button onClick={() => changePassword()}>Confirmar</button>
            </div>
          ) : (
            "Cambiar Contraseña"
          )}
        </div>
        <div
          onClick={() => (menu ? deleteUser() : null)}
          className={menu ? "navbutton" : "hide"}
        >
          Eliminar Cuenta
        </div>
      </div>
    </div>
  );
});
export default Navbar;
