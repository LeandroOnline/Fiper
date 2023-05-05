import axios from "axios";
import { useNavigate } from "react-router-dom";
import useVerify from "../hooks/useVerify";
import { API } from "../utils/api";

const SignUp = () => {
  const navigate = useNavigate();

  const Sign = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // useVerify verificara el email y password para ingresos correctos desde lado cliente
    const verify = useVerify(email, password);

    if (verify) {
      await axios
        .post(API + "/adduser", {
          email: email,
          password: password,
        })
        .then((data) => {
          if (data.data === "Usuario existente") {
            window.alert(
              "Usuario 'Existente', prueve otro email o inicie sesion"
            );
          } else {
            window.alert("Usuario Agregado");
            navigate("/login");
          }
        })
        .catch((err) => console.log(err));
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
