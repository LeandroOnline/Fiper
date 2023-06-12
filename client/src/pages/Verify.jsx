import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axiosCheckValidate from "../api/axiosCheckValidate";
import useGlobalStore from "../store/Store";
import "./Verify.css";
import axiosSendEmail from "../api/axiosSendEmail";
import Popup from "../components/Popup";
import verify from "../assets/verificar.png";

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
        setVerifyMessage();
        navigate("/");
      } else {
        setPopupConfig({
          type: "error",
          text: "No se pudo validar la cuenta, intente nuevamente",
          toConfirm: true,
          query: false,
        });
        setPopupActivate(true);
      }
    });
  };

  if (!login) tokenValidate();

  const reSendEmail = () => {
    axiosSendEmail(emailStore).then(() => {
      setPopupConfig({
        type: "ok",
        text: "Correo enviado",
        toConfirm: false,
        query: false,
      });
      setPopupActivate(true);
    });
  };

  return (
    <div className="verifyContainer">
      <img className="verifyImg" src={verify} alt="" />
      <h1>Verifica tu cuenta para empezar</h1>
      <button className="buttonVerify" onClick={() => reSendEmail()}>
        Si no te llego el correo haz click
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
