import axiosSign from "../api/axiosSign";
import { useNavigate } from "react-router-dom";
import useVerifySyntax from "../hooks/useVerifySyntax";
import "./SignUp.css";

import proteger from "../assets/proteger.png";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  const Sign = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const verify = useVerifySyntax(email, password) && pass1 === pass2;
    if (verify) {
      const send = {
        email: email,
        password: password,
      };
      axiosSign(send).then(() => navigate("/login"));
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
    </div>
  );
};
export default SignUp;
