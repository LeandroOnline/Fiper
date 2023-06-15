import { useState } from "react";
import axiosSign from "../api/axiosSign";
import useVerifySyntax from "../hooks/useVerifySyntax";
import proteger from "../assets/proteger.png";
import axiosSendEmail from "../api/axiosSendEmail";
import "./SignUp.css";
import Popup from "../components/Popup";
import { Link } from "react-router-dom";
import useErrorHandler from "../hooks/useErrorHandler";

const SignUp = () => {
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  const [popupConfig, setPopupConfig] = useState({ toConfirm: true });

  const Sign = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const VerifySyntax = useVerifySyntax(email, password) && pass1 === pass2;
    if (VerifySyntax) {
      const send = {
        email: email,
        password: password,
      };
      axiosSign(send)
        .then((data) => {
          if (data === "Existing user") {
            setPopupConfig({
              type: "error",
              text: "Usuario existente",
              activate: true,
            });
          }
          if (data === "Added user") {
            axiosSendEmail(email)
              .then((data) => {
                setPopupConfig({
                  type: "ok",
                  text: "Verifica tu correo",
                  activate: true,
                  toConfirm: true,
                });
              })
              .catch((err) => setPopupConfig(useErrorHandler(err)));
          }
        })
        .catch((err) => setPopupConfig(useErrorHandler(err)));
    } else {
      setPopupConfig({
        type: "error",
        text: "Ingresos incorrectos",
        activate: true,
        toConfirm: true,
      });
    }
  };

  return (
    <div className="signcontainer">
      <Popup config={{ popupConfig, setPopupConfig }} />
      <form className="sign" onSubmit={(e) => Sign(e)}>
        <img className="imgsign" src={proteger} alt="" />
        <div className="SignAllText">
          <p className="SignText">Su contraseña debe contener:</p>
          <div className="minimum">
            <p className="SignText">- Minimo siete caracteres</p>
            <p className="SignText">- Al menos una mayuscula</p>
            <p className="SignText">- Al menos un numero</p>
          </div>
        </div>
        <input
          placeholder="... email"
          name="email"
          required
          className="loginInput"
        />
        <input
          placeholder="... contraseña"
          name="password"
          type="password"
          required
          value={pass1}
          onChange={(e) => setPass1(e.target.value)}
          className="loginInput"
        />
        <input
          placeholder="... repita la contraseña"
          name="password2"
          type="password"
          required
          value={pass2}
          onChange={(e) => setPass2(e.target.value)}
          className="loginInput"
        />
        <div className="buttonforms">
          <Link to="/login" className="loginButtons">
            <button className="buttonSign">Ingresar</button>
          </Link>
          <button className="loginButtons" type="submit">
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
