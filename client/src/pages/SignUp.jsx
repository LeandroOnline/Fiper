import axiosSign from "../api/axiosSign";
import { useNavigate } from "react-router-dom";
import useVerify from "../hooks/useVerify";
import "./SignUp.css";

import proteger from "../assets/proteger.png";

const SignUp = () => {
  const navigate = useNavigate();

  const Sign = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const verify = useVerify(email, password);
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
        <input placeholder="email" name="email" required />
        <input
          placeholder="contraseña"
          name="password"
          type="password"
          required
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};
export default SignUp;
