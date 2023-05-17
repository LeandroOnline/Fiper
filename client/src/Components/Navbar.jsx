import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import useGlobalStore from "../store/Store";
import axiosDeleteUser from "../api/axiosDeleteUser";
import axiosLogout from "../api/axiosLogout";
import { memo, useState } from "react";
import { shallow } from "zustand/shallow";

import flechas from "../assets/flechas.png";
import flechasizq from "../assets/flechaizq.png";

const Navbar = memo(() => {
  const [menu, setMenu] = useState(true);
  const { setLogged, login } = useGlobalStore(
    (state) => ({
      logged: state.logged,
      setLogged: state.setLogged,
      login: state.login,
    }),
    shallow
  );
  const navigate = useNavigate();

  const deleteUser = async () => {
    if (window.confirm("Seguro desea eliminar el usuario y sus entradas?")) {
      await axiosDeleteUser().then(() => {
        window.alert("Usuario eliminado");
        setLogged();
      });
    }
  };

  const logout = async () =>
    await axiosLogout().then(() => {
      navigate("/");
      setLogged();
    });

  return (
    <div className="navcontainer">
      <div className="menu">
        <p
          className={menu ? "title" : "titleTransparent"}
          onClick={() => setMenu(!menu)}
        >
          FIPES
          {menu ? (
            <img className="menuflechas" src={flechasizq} alt="" />
          ) : (
            <img className="menuflechas" src={flechas} alt="" />
          )}
        </p>
        <div className={menu ? "blur" : "hide"}></div>
        <Link
          to="/"
          className={menu ? "navbutton" : "hide"}
        >
          DashBoard
        </Link>
        {login ? (
          <>
            <div
              onClick={() => {
                logout();
              }}
              className={menu ? "navbutton" : "hide"}
            >
              Salir
            </div>
            <div
              onClick={() => deleteUser()}
              className={menu ? "navbutton" : "hide"}
            >
              Elim.Cuenta
            </div>
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
    </div>
  );
});
export default Navbar;
