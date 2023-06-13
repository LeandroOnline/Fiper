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

const Login = () => {
  const navigate = useNavigate();
  const login = useGlobalStore((state) => state.login);
  const setLogin = useGlobalStore((state) => state.setLogin);
  const checkVerify = useGlobalStore((state) => state.checkVerify);
  const setVerify = useGlobalStore((state) => state.setVerify);
  const setEmailStore = useGlobalStore((state) => state.setEmailStore);

  const [popupActivate, setPopupActivate] = useState(false);
  const [popupConfig, setPopupConfig] = useState({
    type: "ok",
    text: "popupText",
    toConfirm: true,
    query: false,
  });

  const Log = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const verify = useVerifySyntax(email, password);
    if (verify) {
      await axiosLogin(email, password).then((token) => {
        if (token === "Incorrect pasword") {
          setPopupConfig({
            type: "warning",
            text: "Contraseña incorrecta",
            toConfirm: false,
            query: true,
          });
          setPopupActivate(true);
        } else if (token === "User not found") {
          setPopupConfig({
            type: "warning",
            text: "Usuario no encontrado",
            toConfirm: false,
            query: true,
          });
          setPopupActivate(true);
        } else if (token === "error") {
          setPopupConfig({
            type: "error",
            text: "Lo sentimos, estamos en mantenimiento",
            toConfirm: false,
            query: true,
          });
          setPopupActivate(true);
        } else {
          setEmailStore(email);
          sessionStorage.setItem("user", token);
          const checkStatus = async () =>
            await axiosCheckVerify().then((check) => {
              if (check) setVerify();
              setLogin(token);
              navigate("/");
            });
          checkStatus();
        }
      });
    } else {
      setPopupConfig({
        type: "error",
        text: "Ingreso invalido",
        toConfirm: false,
        query: true,
      });
      setPopupActivate(true);
    }
  };

  return (
    <div className="logincontainer">
      {login && checkVerify ? (
        <div className="login">Ya has ingresado</div>
      ) : login && !checkVerify ? (
        <Verify />
      ) : (
        <form className="login" onSubmit={(e) => Log(e)}>
          <img className="imglogin" src={log} alt="" />
          <p className="SignText">Inicio de Sesión</p>
          <input className="loginInput" placeholder="... email" name="email" />
          <input className="loginInput" placeholder="... contraseña" name="password" type="password" />
          <div className="buttonforms">
            <button type="submit" className="loginButtons">Ingresar</button>
            <Link to="/signup" className="loginButtons">
              <button className="buttonSign">Registrarse</button>
            </Link>
          </div>
        </form>
      )}
      <Popup
        popupActivate={popupActivate}
        setPopupActivate={() => setPopupActivate(false)}
        type={popupConfig.type}
        text={popupConfig.text}
        toConfirm={popupConfig.toConfirm}
        query={popupConfig.query}
      />
    </div>
  );
};
export default Login;
