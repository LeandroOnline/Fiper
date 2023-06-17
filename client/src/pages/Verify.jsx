import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axiosCheckValidate from "../api/axiosCheckValidate";
import useGlobalStore from "../store/Store";
import "./Verify.css";
import axiosSendEmail from "../api/axiosSendEmail";
import Popup from "../components/Popup";
import verify from "../assets/verificar.png";
import useErrorHandler from "../hooks/useErrorHandler";

const Verify = () => {
  const { id } = useParams();
  const login = useGlobalStore((state) => state.login);
  const setLogin = useGlobalStore((state) => state.setLogin);
  const setVerify = useGlobalStore((state) => state.setVerify);
  const emailStore = useGlobalStore((state) => state.emailStore);
  const setEmailStore = useGlobalStore((state) => state.setEmailStore);
  const setNickname = useGlobalStore((state) => state.setNickname);
  const setVerifyMessage = useGlobalStore((state) => state.setVerifyMessage);
  const navigate = useNavigate();

  const [popupConfig, setPopupConfig] = useState({ toConfirm: true });

  const tokenValidate = async () => {
    await axiosCheckValidate(id)
      .then((data) => {
        if (data.status === "Checked Account") {
          sessionStorage.setItem("user", data.token);
          setLogin(data.token);
          setEmailStore(data.email);
          setNickname(data.nickname);
          setVerify();
          setVerifyMessage();
          navigate("/");
        } else if (data.status === "Invalid ID, can not check account") {
          setPopupConfig({
            type: "error",
            text: "Usuario no encontrado",
            activate: true,
          });
        }
      })
      .catch((err) => setPopupConfig(useErrorHandler(err)));
  };

  if (!login) tokenValidate();

  const reSendEmail = () => {
    axiosSendEmail(emailStore)
      .then(() => {
        setPopupConfig({
          type: "ok",
          text: "Correo enviado",
          activate: true,
        });
      })
      .catch((err) => setPopupConfig(useErrorHandler(err)));
  };

  return (
    <div className="verifyContainer">
      <img className="verifyImg" src={verify} alt="" />
      <h1>Verifica tu cuenta para empezar</h1>
      <button className="buttonVerify" onClick={() => reSendEmail()}>
        Si no te llego el correo haz click
      </button>
      <Popup config={{ popupConfig, setPopupConfig }} />
    </div>
  );
};
export default Verify;
