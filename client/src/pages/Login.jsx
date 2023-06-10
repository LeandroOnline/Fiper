import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import useVerifySyntax from "../hooks/useVerifySyntax";
import useGlobalStore from "../store/Store";
import axiosLogin from "../api/axiosLogin";
import log from "../assets/login.png";
import axiosCheckVerify from "../api/axiosCheckVerify";
import Verify from "./Verify";

const Login = () => {
  const navigate = useNavigate();
  const login = useGlobalStore((state) => state.login);
  const setLogin = useGlobalStore((state) => state.setLogin);
  const checkVerify = useGlobalStore((state) => state.checkVerify);
  const setVerify = useGlobalStore((state) => state.setVerify);
  const setEmailStore = useGlobalStore((state) => state.setEmailStore);

  const Log = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const verify = useVerifySyntax(email, password);
    if (verify) {
      await axiosLogin(email, password).then((token) => {
        if (token) {
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
      window.alert("Ingresos invalidos");
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
