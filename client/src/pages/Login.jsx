import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import API from "../api/apiUrl";
import useVerify from "../hooks/useVerify";
import useGlobalStore from "../store/Store";

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
      await axios
        .post(
          API + "/login",
          {
            email: email,
            password: password,
          },
          {
            withCredentials: true,
          }
        )
        .then((data) =>
          data.data === "Logged"
            ? Logged()
            : data.data === "Incorrect pasword"
            ? window.alert("Contraseña incorrecta, ingresa nuevamente")
            : data.data === "User not found"
            ? window.alert("Usuario no encontrado")
            : console.log(data)
        )
        .catch((err) => {
          console.log(err);
          window.alert(
            "Error al conectar el usuario al servidor, contacte al administrador"
          );
        });
    } else {
      window.alert("Ingresos invalidos");
    }
  };

  const Logged = () => {
    setLogin();
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
