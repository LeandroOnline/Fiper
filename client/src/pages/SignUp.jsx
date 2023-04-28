import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3000/api";

const SignUp = () => {
  const navigate = useNavigate();
  const Sign = async (e) => {
    e.preventDefault();
    await axios
      .post(API + '/adduser', {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((data) => {console.log(data); window.alert("Usuario Agregado"); navigate('/login') });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={(e) => Sign(e)}>
        <input placeholder="email" name="email" />
        <br />
        <input placeholder="contraseña" name="password" />
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
export default SignUp;
