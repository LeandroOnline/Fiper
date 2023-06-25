import { useEffect, useState } from "react";
import axiosSign from "../api/axiosSign";
import useVerifySyntax from "../hooks/useVerifySyntax";
import axiosSendEmail from "../api/axiosSendEmail";
import "./SignUp.css";
import Popup from "../components/Popup";
import { Link } from "react-router-dom";
import useErrorHandler from "../hooks/useErrorHandler";
import key from "../assets/llave.png";
import email from "../assets/@.png";

const SignUp = () => {
  const [pass1, setPass1] = useState("");
  const [passStatus, setPassStatus] = useState(false);
  const [keyStatus, setKeyStatus] = useState(false);
  const [popupConfig, setPopupConfig] = useState({ toConfirm: true });

  const Sign = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const VerifySyntax = useVerifySyntax(email, password);
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

  const minimumPass = (pass1) => {
    const length = pass1.length > 6 ? true : false;
    const mayus = /[A-Z]/.test(pass1);
    const num = /\d/.test(pass1);
    setPassStatus({ length, mayus, num });
  };

  useEffect(() => {
    minimumPass(pass1);
  }, [pass1]);

  return (
    <div className="signcontainer">
      <Popup config={{ popupConfig, setPopupConfig }} />
      <form className="sign" onSubmit={(e) => Sign(e)}>
        <h1 className="SignTitle">Registro</h1>
        <div className="inputFormContainer">
          <input
            className="loginInput"
            placeholder="... email"
            name="email"
            required
          />
          <img src={email} alt="" className="emailAndKey" />
        </div>
        <div className="inputFormContainer">
          <input
            className="loginInput"
            placeholder="... contraseña"
            name="password"
            required
            value={pass1}
            onChange={(e) => setPass1(e.target.value)}
            type={keyStatus ? "text" : "password"}
          />
          <img
            src={key}
            alt=""
            className="emailAndKey hoverKey"
            onClick={() => setKeyStatus(!keyStatus)}
          />
        </div>

        <div className="minimum">
          <p className={passStatus.length ? "SignTextGreen" : "SignText"}>
            {passStatus.length
              ? "✓ Mas de 6 caracteres"
              : "● Mas de 6 caracteres"}
          </p>
          <p className={passStatus.mayus ? "SignTextGreen" : "SignText"}>
            {passStatus.mayus ? "✓ Incluye mayusculas" : "● Incluye mayusculas"}
          </p>
          <p className={passStatus.num ? "SignTextGreen" : "SignText"}>
            {passStatus.num ? "✓ Incluye numeros" : "● Incluye numeros"}
          </p>
        </div>

        <div className="buttonforms">
          <button className="loginButtons" type="submit">
            Registrarse
          </button>
          <Link to="/login" className="loginButtonSecondary">
            Ya tienes cuenta? <span className="secondaryAction">inicia sesion</span>
          </Link>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
