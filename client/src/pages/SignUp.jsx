import { useState } from "react";
import axiosSign from "../api/axiosSign";
import useVerifySyntax from "../hooks/useVerifySyntax";
import proteger from "../assets/proteger.png";
import axiosSendEmail from "../api/axiosSendEmail";
import "./SignUp.css";
import Popup from "../components/Popup";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  
  const [popupActivate, setPopupActivate] = useState(false);
  const [popupChoise, setPopupChoise] = useState(null);
  const [popupConfig, setPopupConfig] = useState({
    type: "ok",
    text: "popupText",
    toConfirm: true,
    query: false,
  });

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
      axiosSign(send).then(() => {
        axiosSendEmail(email)
          .then(() => {
            setPopupConfig({
              type: "ok",
              text: "Verifica tu correo",
              toConfirm: true,
              query: false,
            });
            setPopupActivate(true);
          })
          .catch(() => {
            setPopupConfig({
              type: "error",
              text: "Lo sentimos, estamos en mantenimiento",
              toConfirm: false,
              query: false,
            });
            setPopupActivate(true);
          });
      });
    } else {
      setPopupConfig({
        type: "error",
        text: "Email o contraseña invalido",
        toConfirm: false,
        query: false,
      });
      setPopupActivate(true);
    }
  };

  return (
    <div className="signcontainer">
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
export default SignUp;
