import axiosSign from "../api/axiosSign";
import { useNavigate } from "react-router-dom";
import useVerify from "../hooks/useVerify";

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
    <div>
      <p>Su contraseña debe contener como minimo: </p>
      <p>- Siete caracteres</p>
      <p>- Una letra mayuscula</p>
      <p>- Un numero</p>
      <form onSubmit={(e) => Sign(e)}>
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
