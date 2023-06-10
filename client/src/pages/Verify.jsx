import { Link, useNavigate, useParams } from "react-router-dom";
import "./Verify.css";
import axiosCheckValidate from "../api/axiosCheckValidate";
import useGlobalStore from "../store/Store";

const Verify = () => {
  const { id } = useParams();
  const { login } = useGlobalStore();
  const navigate = useNavigate();

  const tokenValidate = async () => {
    await axiosCheckValidate(id).then((data) => {
      if (data.data === "Checked Account") {
        window.alert("Cuenta Verificada, inicie sesion para continuar");
        navigate("/login");
      } else {
        window.alert("No se pudo validar la cuenta, intente nuevamente");
      }
    });
  };

  // AGREGAR reenvio de email manual

  if (!login) tokenValidate();

  return (
    <div className="verifyContainer">
      <h1>Verifica tu cuenta para empezar</h1>
      <p>
        Te enviamos un email a tu correo electronico para verificar tu cuenta
      </p>
      <h2>No te llego el correo de verificacion?</h2>
      <p>
        Vuelve a solicitarlo haciendo <Link>clic aqui</Link>
      </p>
    </div>
  );
};
export default Verify;
