import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axiosCheckValidate from "../api/axiosCheckValidate";
import useGlobalStore from "../store/Store";
import "./Verify.css";
import axiosSendEmail from "../api/axiosSendEmail";
import Popup from "../components/Popup";

const Verify = () => {
  const { id } = useParams();
  const login = useGlobalStore((state) => state.login);
  const setLogin = useGlobalStore((state) => state.setLogin);
  const setVerify = useGlobalStore((state) => state.setVerify);
  const emailStore = useGlobalStore((state) => state.emailStore);
  const setVerifyMessage = useGlobalStore((state) => state.setVerifyMessage);
  const navigate = useNavigate();

  const [popupActivate, setPopupActivate] = useState(false);
  const [popupChoise, setPopupChoise] = useState(null);
  const [popupConfig, setPopupConfig] = useState({
    type: "ok",
    text: "popupText",
    toConfirm: true,
    query: false,
  });

  const tokenValidate = async () => {
    await axiosCheckValidate(id).then((data) => {
      if (data.data.status === "Checked Account") {
        sessionStorage.setItem("user", data.data.token);
        setLogin(data.data.token);
        setVerify();
        // window.alert("Cuenta Verificada");
        setVerifyMessage();
        navigate("/");
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
      <Popup
        popupActivate={popupActivate}
        setPopupActivate={() => setPopupActivate(false)}
        choise={setPopupChoise}
        type={popupConfig.type}
        text={popupConfig.text}
        toConfirm={popupConfig.toConfirm}
        query={popupConfig.query}
      />
    </div>
  );
};
export default Verify;
