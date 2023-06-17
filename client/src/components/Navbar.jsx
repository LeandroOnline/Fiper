import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import useGlobalStore from "../store/Store";
import axiosDeleteUser from "../api/axiosDeleteUser";
import axiosUpdatePassword from "../api/axiosUpdatePassword";
import config from "../assets/configuracion.png";
import Popup from "./Popup";
import useErrorHandler from "../hooks/useErrorHandler";
import notification from "../assets/sonido.png";
import mute from "../assets/mute.png";

const Navbar = memo(() => {
  const [configIsOpen, setConfigIsOpen] = useState(false);
  const [password, setPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [popupConfig, setPopupConfig] = useState({ toConfirm: true });
  const { emailStore, setLogin, login, setVerifyFalse, setSound, sound } =
    useGlobalStore(
      (state) => ({
        emailStore: state.emailStore,
        setLogin: state.setLogin,
        login: state.login,
        setVerifyFalse: state.setVerifyFalse,
        setSound: state.setSound,
        sound: state.sound,
      }),
      shallow
    );

  const navigate = useNavigate();

  useEffect(() => {
    popupConfig.choise ? deleteUser() : null;
  }, [popupConfig.choise]);

  const deleteUser = async () => {
    if (!popupConfig.choise) {
      setPopupConfig({
        type: "query",
        text: "Desea eliminar su cuenta?",
        activate: true,
        // --->
        toConfirm: true,
        query: true,
        choise: null,
        // <--- only if is necessary
      });
    } else {
      await axiosDeleteUser()
        .then((data) => {
          if (data === "Deleted user") {
            setPopupConfig({
              type: "ok",
              text: "Usuario eliminado",
              activate: true,
            });
            setLogin(null);
            setConfigIsOpen(false);
            setVerifyFalse();
          }
        })
        .catch((err) => setPopupConfig(useErrorHandler(err)));
    }
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setLogin(null);
    navigate("/login");
    setVerifyFalse();
  };

  const changePassword = async (currentPassword, newPassword) => {
    if (currentPassword !== "" && newPassword !== "") {
      await axiosUpdatePassword(currentPassword, newPassword)
        .then((data) => {
          if (data === "Password changed") {
            setPopupConfig({
              type: "ok",
              text: "Contraseña actualizada",
              activate: true,
            });
            setPassword(false);
            setConfigIsOpen(false);
            setCurrentPassword("");
            setNewPassword("");
          } else if (data === "Incorrect current password") {
            setPopupConfig({
              type: "error",
              text: "Contraseña actual incorrecta",
              activate: true,
            });
            setConfigIsOpen(!configIsOpen);
          }
        })
        .catch((err) => setPopupConfig(useErrorHandler(err)));
    } else {
      setPopupConfig({
        type: "error",
        text: "Ingresos invalidos",
        activate: true,
      });
      setConfigIsOpen(!configIsOpen);
    }
  };

  const email = emailStore;
  const username = email.split("@")[0];
  const formattedUsername =
    username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();

  return (
    <div className="navcontainer">
      <Popup config={{ popupConfig, setPopupConfig }} />
      <div className="menu">
        <Link to="/" className="navbutton">
          <h1 className="title">FIPE</h1>
        </Link>
        <div className="blur"></div>
        {login ? (
          <>
            <div className="nickname">
              <p className="email">{formattedUsername}</p>
              <img
                src={config}
                alt=""
                className={configIsOpen ? "configOpen" : "config"}
                onClick={() => {
                  setConfigIsOpen(!configIsOpen);
                  setPassword(false);
                }}
              />
            </div>
            <img
              src={sound ? notification : mute}
              alt=""
              onClick={() => setSound()}
              className="sound"
            />
          </>
        ) : (
          <>
            <Link to="/login" className="navbutton">
              Entrar
            </Link>
            <Link to="/signup" className="navbutton">
              Registrarse
            </Link>
          </>
        )}
      </div>

      <div className={configIsOpen ? "configmerge" : "configclose"}>
        <div
          onClick={() => {
            logout();
            setConfigIsOpen(false);
          }}
          className="navbutton"
        >
          Salir
        </div>
        <div className="lineMerge"></div>
        <div
          className="navbutton"
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
        <div onClick={() => deleteUser()} className="navbutton">
          Eliminar Cuenta
        </div>
      </div>
    </div>
  );
});
export default Navbar;
