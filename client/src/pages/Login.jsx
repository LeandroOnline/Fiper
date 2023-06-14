import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import useVerifySyntax from "../hooks/useVerifySyntax";
import useGlobalStore from "../store/Store";
import axiosLogin from "../api/axiosLogin";
import log from "../assets/login.png";
import axiosCheckVerify from "../api/axiosCheckVerify";
import Verify from "./Verify";
import Popup from "../components/Popup";
import { useState } from "react";
import axiosRemember from "../api/axiosRemember";
import useErrorHandler from "../hooks/useErrorHandler";

const Login = () => {
  const navigate = useNavigate();
  const login = useGlobalStore((state) => state.login);
  const setLogin = useGlobalStore((state) => state.setLogin);
  const checkVerify = useGlobalStore((state) => state.checkVerify);
  const setVerify = useGlobalStore((state) => state.setVerify);
  const setEmailStore = useGlobalStore((state) => state.setEmailStore);

  const [rememberActivate, setRememberActivate] = useState(false);
  const [rememberInput, setRememberInput] = useState("");

  const [popupConfig, setPopupConfig] = useState({ toConfirm: true });

  const Log = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const verify = useVerifySyntax(email, password);
    if (verify) {
      await axiosLogin(email, password)
        .then((data) => {
          if (data === "Incorrect pasword") {
            setPopupConfig({
              type: "error",
              text: "Contraseña incorrecta",
              activate: true,
            });
          } else if (data === "User not found") {
            setPopupConfig({
              type: "error",
              text: "Usuario no encontrado",
              activate: true,
            });
          } else {
            setEmailStore(email);
            sessionStorage.setItem("user", data);
            const checkStatus = async () =>
              await axiosCheckVerify()
                .then((check) => {
                  if (check) setVerify();
                  setLogin(data);
                  navigate("/");
                })
                .catch((err) => setPopupConfig(useErrorHandler(err)));
            checkStatus();
          }
        })
        .catch((err) => setPopupConfig(useErrorHandler(err)));
    } else {
      setPopupConfig({
        type: "error",
        text: "Ingresos invalidos",
        activate: true,
      });
    }
  };

  const Remember = async (rememberInput) => {
    const verify = useVerifySyntax(rememberInput, "Qqq1111");
    if (verify) {
      await axiosRemember(rememberInput)
        .then((data) => {
          if (data === "Generate password") {
            setPopupConfig({
              type: "ok",
              text: "Revise su correo",
              activate: true,
            });
            setRememberActivate(!rememberActivate);
            setRememberInput("");
          } else if (data === "Account not found") {
            setPopupConfig({
              type: "error",
              text: "Cuenta no encontrada",
              activate: true,
            });
          }
        })
        .catch((err) => setPopupConfig(useErrorHandler(err)));
    } else {
      setPopupConfig({
        type: "error",
        text: "Ingreso incorrecto",
        activate: true,
      });
    }
  };

  return (
    <div className="logincontainer">
      <Popup config={{ popupConfig, setPopupConfig }} />
      {login && checkVerify ? (
        <div className="login">Ya has ingresado</div>
      ) : login && !checkVerify ? (
        <Verify />
      ) : (
        <div className="login">
          <form className="loginForm" onSubmit={(e) => Log(e)}>
            <img className="imglogin" src={log} alt="" />
            <p className="SignText">Inicio de Sesión</p>
            <input
              className="loginInput"
              placeholder="... email"
              name="email"
            />
            <input
              className="loginInput"
              placeholder="... contraseña"
              name="password"
              type="password"
            />
            <div className="buttonforms">
              <Link to="/signup" className="loginButtons">
                <button className="buttonSign">Registrarse</button>
              </Link>
              <button type="submit" className="loginButtons">
                Ingresar
              </button>
            </div>
          </form>
          {rememberActivate ? (
            <div className="inputAndSendRemember">
              <input
                className="inputRemember"
                type="text"
                placeholder="Ingresa tu cuenta de correo"
                value={rememberInput}
                onChange={(e) => setRememberInput(e.target.value)}
              />
              <button
                className="sendRemember"
                onClick={() => Remember(rememberInput)}
              >
                Enviar
              </button>
            </div>
          ) : (
            <button
              className="remember"
              onClick={() => setRememberActivate(!rememberActivate)}
            >
              Olvido la contraseña?
            </button>
          )}
        </div>
      )}
    </div>
  );
};
export default Login;
