import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import useGlobalStore from "../store/Store";
import axiosDeleteUser from "../api/axiosDeleteUser";
import axiosUpdatePassword from "../api/axiosUpdatePassword";

import flechas from "../assets/flechas.png";
import flechasizq from "../assets/flechaizq.png";
import config from "../assets/configuracion.png";
import Popup from "./Popup";

const Navbar = memo(() => {
  const [menu, setMenu] = useState(true);
  const [configIsOpen, setConfigIsOpen] = useState(false);
  const [password, setPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [popupActivate, setPopupActivate] = useState(false);
  const [popupChoise, setPopupChoise] = useState(null);
  const [popupConfig, setPopupConfig] = useState({
    type: "ok",
    text: "popupText",
    toConfirm: true,
    query: false,
  });

  const { setLogin, login, setVerifyFalse } = useGlobalStore(
    (state) => ({
      setLogin: state.setLogin,
      login: state.login,
      setVerifyFalse: state.setVerifyFalse,
    }),
    shallow
  );

  const navigate = useNavigate();

  useEffect(() => {
    popupChoise ? deleteUser() : null;
  }, [popupChoise]);

  const deleteUser = async () => {
    if (!popupChoise) {
      setPopupConfig({
        type: "ok",
        text: "Desea eliminar su cuenta?",
        toConfirm: true,
        query: true,
      });
      setPopupActivate(true);
      setConfigIsOpen(!configIsOpen);
    } else {
      console.log(popupChoise);
      await axiosDeleteUser().then(() => {
        setPopupConfig({
          type: "ok",
          text: "Usuario eliminado",
          toConfirm: false,
          query: true,
        });
        setPopupActivate(true);
        setLogin(null);
        setConfigIsOpen(false);
        setVerifyFalse();
      });
    }
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setLogin(null);
    navigate("/login");
    setVerifyFalse();
  };

  const changePassword = async (currentPassword, newPassword) => {
    await axiosUpdatePassword(currentPassword, newPassword).then((data) => {
      if (data.data === "Password changed") {
        setPopupConfig({
          type: "ok",
          text: "Contraseña actualizada",
          toConfirm: false,
          query: true,
        });
        setConfigIsOpen(!configIsOpen);
        setPopupActivate(true);
        setPassword(false);
        setConfigIsOpen(false);
        setCurrentPassword("");
        setNewPassword("");
      } else if (data.data === "Incorrect current password") {
        setPopupConfig({
          type: "ok",
          text: "Contraseña actual incorrecta",
          toConfirm: false,
          query: true,
        });
        setConfigIsOpen(!configIsOpen);
        setPopupActivate(true);
      }
    });
  };

  return (
    <div className="navcontainer">
      <Popup
        popupActivate={popupActivate}
        setPopupActivate={() => setPopupActivate(false)}
        choise={setPopupChoise}
        type={popupConfig.type}
        text={popupConfig.text}
        toConfirm={popupConfig.toConfirm}
        query={popupConfig.query}
      />
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
                setConfigIsOpen(false);
              }}
              className={menu ? "navbutton" : "hide"}
            >
              Salir
            </div>
            <img
              src={config}
              alt=""
              className={menu ? "config" : "hide"}
              onClick={() => {
                setConfigIsOpen(!configIsOpen);
                setPassword(false);
              }}
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
                type="password"
                className="newpassword"
                placeholder="Contraseña Actual.."
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <input
                type="password"
                className="newpassword"
                placeholder="Contraseña Nueva.."
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                onClick={() => changePassword(currentPassword, newPassword)}
              >
                Confirmar
              </button>
            </div>
          ) : (
            "Cambiar Contraseña"
          )}
        </div>
        <div className="lineMerge"></div>
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
