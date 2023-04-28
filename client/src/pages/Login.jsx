import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { useContext } from "react";
import { context } from "../App";

const API = "http://localhost:3000/api";

const Login = () => {
  const navigate = useNavigate();
  const { logged, setLogged } = useContext(context);

  const Login = async (e) => {
    e.preventDefault();
    await axios
      .post(
        API + "/login",
        {
          email: e.target.email.value,
          password: e.target.password.value,
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
          ? window.alert(
              "Usuario no encontrado, si no tienes cuenta registrate"
            )
          : console.log("algo salio mal")
      )
      .catch((err) => {
        console.log(err);
        window.alert(
          "Error al borrar los datos del servidor, contacte al administrador"
        );
      });
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
          {" "}
          <h1>Log In</h1>
          <form onSubmit={(e) => Login(e)}>
            <input placeholder="email" name="email" />
            <input placeholder="contraseña" name="password" />
            <button type="submit">Login</button>
          </form>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </>
      )}
    </div>
  );
};
export default Login;
