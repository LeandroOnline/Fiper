import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3000/api";

const SignUp = () => {
  const navigate = useNavigate();

  const Sign = async (e) => {
    e.preventDefault();
    await axios
      .post(API + "/adduser", {
        email: e.target.email.value,
        password: e.target.password.value,
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
  };

  return (
    <div>
      <form onSubmit={(e) => Sign(e)}>
        <input placeholder="email" name="email" required/>
        <input placeholder="contraseña" name="password" type="password" required/>
        <p>Su contraseña debe contener como minimo: </p><br />
        <p>- Siete caracteres</p>
        <p>- Una letra mayuscula</p>
        <p>- Un numero</p>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};
export default SignUp;
