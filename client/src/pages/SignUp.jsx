import { useState } from "react";
import axiosSign from "../api/axiosSign";
import useVerifySyntax from "../hooks/useVerifySyntax";
import proteger from "../assets/proteger.png";
import axiosSendEmail from "../api/axiosSendEmail";
import "./SignUp.css";
import Popup from "../components/Popup";

const SignUp = () => {
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [popupActivate, setPopupActivate] = useState(false);
  const [popupText, setPopupText] = useState("");

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
        axiosSendEmail(email);
        setPopupText("Verifica tu correo");
        setPopupActivate(true);
      });
    } else {
      window.alert("Email o contraseña invalidos");
    }
  };

  return (
    <div className="signcontainer">
      <form className="sign" onSubmit={(e) => Sign(e)}>
        <img className="imgsign" src={proteger} alt="" />
        <div className="SignAllText">
          <p className="SignText"> Su contraseña debe contener: </p>
          <p className="SignText">- Minimo siete caracteres</p>
          <p className="SignText">- Al menos una mayuscula</p>
          <p className="SignText">- Al menos un numero</p>
        </div>
        <input placeholder="... email" name="email" required />
        <input
          placeholder="... contraseña"
          name="password"
          type="password"
          required
          value={pass1}
          onChange={(e) => setPass1(e.target.value)}
        />
        <input
          placeholder="... repita la contraseña"
          name="password2"
          type="password"
          required
          value={pass2}
          onChange={(e) => setPass2(e.target.value)}
        />
        <button type="submit">Registrarse</button>
      </form>
      <Popup
        popupActivate={popupActivate}
        setPopupActivate={() => setPopupActivate(false)}
        type="ok"
        text={popupText}
        toConfirm={true}
        query={false}
        onConfirm={() => setPopupActivate(false)}
        onCancel={() => setPopupActivate(false)}
      />
    </div>
  );
};
export default SignUp;
