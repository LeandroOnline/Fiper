import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import useGlobalStore from "../store/Store";
import axiosDeleteUser from "../api/axiosDeleteUser";
import axiosLogout from "../api/axiosLogout";
import { memo } from "react";

const Navbar = memo(() => {
  const { logged, setLogged, login } = useGlobalStore();
  const navigate = useNavigate();

  const deleteUser = async () => {
    if (window.confirm("Seguro desea eliminar el usuario y sus entradas?")) {
      await axiosDeleteUser().then(() => {
        window.alert("Usuario eliminado");
        setLogged();
      });
    }
  };

  const logout = async () =>
    await axiosLogout().then(() => {
      navigate("/");
      setLogged();
    });

  console.log("Navbar");

  return (
    <div className="navcontainer">
      <h1 className="title">~ FIPE ~</h1>
      <div className="menu">
        {login && logged? (
          <>
            <div
              onClick={() => {
                logout();
              }}
            >
              Salir
            </div>
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
});
export default Navbar;
