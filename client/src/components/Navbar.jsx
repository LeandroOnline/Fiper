import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import useGlobalStore from "../store/Store";
import axiosDeleteUser from "../api/axiosDeleteUser";
import axiosUpdatePassword from "../api/axiosUpdatePassword";
import axiosUpdateNickname from "../api/axiosUpdateNickname";
import config from "../assets/configuracion.png";
import Popup from "./Popup";
import useErrorHandler from "../hooks/useErrorHandler";
import notification from "../assets/sonido.png";
import mute from "../assets/mute.png";
import useSanitize from "../hooks/useSanitize";
import cafe from "../assets/cafe.png";
import wsp from "../assets/whatsapp1.png";
import exit from "../assets/salir.png";
import entrar from "../assets/entrar.png";
import sign from "../assets/sign.png";

const Navbar = memo(() => {
  const [configIsOpen, setConfigIsOpen] = useState(false);
  const [password, setPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newNickname, setNewNickname] = useState("");
  const [updateNicknameMenu, setUpdateNicknameMenu] = useState(false);
  const [popupConfig, setPopupConfig] = useState({ toConfirm: true });
  const {
    nickname,
    setNickname,
    emailStore,
    setLogin,
    login,
    setVerifyFalse,
    setSound,
    sound,
  } = useGlobalStore(
    (state) => ({
      nickname: state.nickname,
      setNickname: state.setNickname,
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
  const username = emailStore.split("@")[0];
  const NickFromEmail =
    username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
  const TheNickname =
    nickname !== "" ? nickname : emailStore !== "" ? NickFromEmail : null;
  const donar = "https://cafecito.app/devbees";
  const wame =
    "https://wa.me/5493435267411/?text=Hola Leandro, estoy usando FIPE y me encanta!";

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
            setNewNickname("");
            setUpdateNicknameMenu(false);
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

  const UpdateNickname = async (nickname) => {
    // const sanitize = useSanitize(nickname);
    const words = nickname.split(" ");
    const smallOne = words[0].substring(0, 15);

    await axiosUpdateNickname(smallOne)
      .then((data) => {
        if (data === "Updated nickname") {
          setPopupConfig({
            type: "ok",
            text: "Nickname actualizado",
            activate: true,
          });
          setConfigIsOpen(false);
          setNickname(smallOne);
          setNewNickname("");
          setUpdateNicknameMenu(false);
        }
      })
      .catch((err) => setPopupConfig(useErrorHandler(err)));
  };

  return (
    <div className="navcontainer">
        <Popup config={{ popupConfig, setPopupConfig }} />
      <div className="navMenu">
        <Link to="/">
          <h1 className="title">FIPE</h1>
        </Link>
        {login ? (
          <>
            <div className="nickname">
              <p className="email">{TheNickname}</p>
              <img
                src={config}
                alt=""
                className={configIsOpen ? "configOpen" : "config"}
                onClick={() => {
                  setConfigIsOpen(!configIsOpen);
                  setPassword(false);
                  setUpdateNicknameMenu(false);
                }}
              />
            </div>


            <a href={wame} target="_blank" className="awsp">
              <img src={wsp} alt="" className="wame" />
            </a>
            <a href={donar} target="_blank" className="cafeContainer">
              <img src={cafe} alt="" className="cafe" />
            </a>
            <img
              src={exit}
              alt=""
              className="wame"
              onClick={() => {
                logout();
                setConfigIsOpen(false);
              }}
            />
          </>
        ) : (
          <>
            <Link to="/login" className="navbutton">
            <img
              src={entrar}
              alt=""
              className="wame2"
              onClick={() => {
                logout();
                setConfigIsOpen(false);
              }}
            />
              Entrar
            </Link>
            <Link to="/signup" className="navbutton">
            <img
              src={sign}
              alt=""
              className="wame2"
              onClick={() => {
                logout();
                setConfigIsOpen(false);
              }}
            />
              Registro
            </Link>
          </>
        )}
      </div>

      <div className={configIsOpen ? "configmerge" : "configclose"}>
        <div
          onClick={() => {
            setConfigIsOpen(false);
            setSound();
          }}
          className="navbutton"
        >
          {sound ? "Silenciar" : "Activar sonido"}
          <img src={sound ? notification : mute} alt="" className="sound" />
        </div>

        <div className="lineMerge"></div>
        <div
          className={updateNicknameMenu ? "" : "navbutton"}
          onClick={() => {
            updateNicknameMenu ? null : setUpdateNicknameMenu(true);
            setPassword(false);
          }}
        >
          {updateNicknameMenu ? (
            <div className="newPasswordContainer">
              <input
                type="text"
                className="newpassword"
                placeholder="... hasta 15 letras"
                value={newNickname}
                onChange={(e) => setNewNickname(useSanitize(e.target.value))}
              />
              <div className="cancelConfirm">
                <button
                  className="cancel"
                  onClick={() => setUpdateNicknameMenu(false)}
                >
                  X
                </button>
                <button
                  className="confirm"
                  onClick={() => UpdateNickname(newNickname)}
                >
                  Confirmar
                </button>
              </div>
            </div>
          ) : (
            "Cambiar Nickname"
          )}
        </div>
        <div className="lineMerge"></div>
        <div
          className={password ? "" : "navbutton"}
          onClick={() => {
            password ? null : setPassword(true);
            setUpdateNicknameMenu(false);
          }}
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
              <div className="cancelConfirm">
                <button className="cancel" onClick={() => setPassword(false)}>
                  X
                </button>
                <button
                  className="confirm"
                  onClick={() => changePassword(currentPassword, newPassword)}
                >
                  Confirmar
                </button>
              </div>
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
