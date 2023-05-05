import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { useContext } from "react";
import { context } from "../contexts/Contexts";
import { API } from "../utils/api";
import useVerify from "../hooks/useVerify";

const Login = () => {
  const navigate = useNavigate();
  const { logged, setLogged } = useContext(context);

  const Login = async (e) => {
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
          data.data === "OK"
            ? Logged()
            : data.data === "Incorrect pasword"
            ? window.alert("Contraseña incorrecta, ingresa nuevamente")
            : data.data === "User not found"
            ? window.alert("Usuario no encontrado")
            : console.log("algo salio mal")
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
    setLogged(true);
    navigate("/");
  };

  return (
    <div className="logincontainer">
      {logged ? (
        <>Ya estas Logueado</>
      ) : (
        <>
          <form onSubmit={(e) => Login(e)}>
            <input placeholder="email" name="email" />
            <input placeholder="contraseña" name="password" type="password" />
            <button type="submit">Ingresar</button>
          </form>
          <Link to="/signup">
            <button>Registrarse</button>
          </Link>
        </>
      )}
    </div>
  );
};
export default Login;
