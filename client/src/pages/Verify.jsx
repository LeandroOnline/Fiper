import { Link, useNavigate, useParams } from "react-router-dom";
import axiosCheckValidate from "../api/axiosCheckValidate";
import useGlobalStore from "../store/Store";
import "./Verify.css";
import axiosSendEmail from "../api/axiosSendEmail";

const Verify = () => {
  const { id } = useParams();
  const login = useGlobalStore((state) => state.login);
  const setLogin = useGlobalStore((state) => state.setLogin);
  const setVerify = useGlobalStore((state) => state.setVerify);
  const emailStore = useGlobalStore((state) => state.emailStore);
  const navigate = useNavigate();

  const tokenValidate = async () => {
    await axiosCheckValidate(id).then((data) => {
      if (data.data.status === "Checked Account") {
        sessionStorage.setItem("user", data.data.token);
        setLogin(data.data.token);
        setVerify();
        navigate("/");
        window.alert("Cuenta Verificada");
      } else {
        window.alert("No se pudo validar la cuenta, intente nuevamente");
      }
    });
  };

  if (!login) tokenValidate();

  // AGREGAR reenvio de email manual <-
  const reSendEmail = () => {
    axiosSendEmail(emailStore).then(() => window.alert("Correo enviado"));
  };

  return (
    <div className="verifyContainer">
      <h1>Verifica tu cuenta para empezar</h1>
      <p>
        Te enviamos un email a tu correo electronico para verificar tu cuenta
      </p>
      <p>No te llego el correo de verificacion?</p>
      <button onClick={() => reSendEmail()}>
        Volver a solicitar correo de verificacion
      </button>
    </div>
  );
};
export default Verify;
