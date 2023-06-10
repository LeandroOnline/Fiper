import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import useVerifySyntax from "../hooks/useVerifySyntax";
import useGlobalStore from "../store/Store";
import axiosLogin from "../api/axiosLogin";
import log from "../assets/login.png";
import axiosSendEmail from "../api/axiosSendEmail";
import axiosCheckVerify from "../api/axiosCheckVerify";
import Verify from "./Verify";

const Login = () => {
  const navigate = useNavigate();
  const { login, setLogin, checkVerify, setVerify } = useGlobalStore();

  const Log = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const verify = useVerifySyntax(email, password);
    if (verify) {
      await axiosLogin(email, password).then((token) => {
        if (token) {
          sessionStorage.setItem("user", token);
          setLogin(token);
        }
      });
    } else {
      window.alert("Ingresos invalidos");
    }
  };

  if (login) {
    const checkStatus = async () =>
      await axiosCheckVerify().then((data) => {
        if (data) {
          setVerify();
          navigate("/");
        } else {
          const send = async () =>
            await axiosSendEmail().then(() =>
              window.alert(
                "Se ha enviado un email de verificacion a su cuenta de correo"
              )
            );
          send();
        }
      });
    checkStatus();
  }

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
          <input placeholder="... email" name="email" />
          <input placeholder="... contraseña" name="password" type="password" />
          <div className="buttonforms">
            <button type="submit">Ingresar</button>
            <Link to="/signup">
              <button>Registrarse</button>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};
export default Login;
