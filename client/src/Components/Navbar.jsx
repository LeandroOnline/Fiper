import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import { context } from "../App";
import axios from "axios";
import { API } from "../App";

const Navbar = () => {
  const { logged, setLogged } = useContext(context);
  const navigate = useNavigate();

  const deleteUser = async () => {
    if (window.confirm("Seguro desea eliminar el usuario y sus entradas?")) {
      await axios
        .delete(API + "/deleteuser", { withCredentials: true })
        .then(() => {
          window.alert("Usuario eliminado");
          setLogged(false);
        })
        .catch((err) => {
          console.log(err);
          window.alert(
            "Error al eliminar el usuario, contacte al administrador"
          );
        });
    }
  };

  const logout = async () => {
    await axios
      .get(API + "/logout", { withCredentials: true })
      .then(() => navigate('/'))
      .catch((err) => {
        console.log(err);
        window.alert("Error al eliminar cookie de sesion, contacte al administrador");
      });
  };

  return (
    <div className="navcontainer">
      <h1 className="title">~ FIPE ~</h1>
      <div className="menu">
        {logged ? (
          <>
            <Link to="/">DashBoard</Link>

            <div onClick={() => {setLogged(false); logout()}}>Salir</div>
            <div onClick={() => deleteUser()}>Eliminar Usuario</div>
          </>
        ) : (
          <>
            <Link to="/login">Entrar</Link>
            <Link to="/signup">Registrarse</Link>
          </>
        )}
      </div>
    </div>
  );
};
export default Navbar;
