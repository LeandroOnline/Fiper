import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import useVerify from "../hooks/useVerify";
import useGlobalStore from "../store/Store";
import axiosLogin from "../api/axiosLogin";

import log from "../assets/login.png";

const Login = () => {
  const navigate = useNavigate();
  const { login, setLogin } = useGlobalStore();

  const Log = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const verify = useVerify(email, password);
    if (verify) {
      axiosLogin(email, password).then((res) => Logged(res));
    } else {
      window.alert("Ingresos invalidos");
    }
  };

  const Logged = (res) => {
    sessionStorage.setItem("user", res);
    setLogin(res);
    navigate("/");
  };

  return (
    <div className="logincontainer">
      {login ? (
        <div className="login">Ya has ingresado</div>
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
