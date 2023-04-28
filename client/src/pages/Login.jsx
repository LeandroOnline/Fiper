import { Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const API = "http://localhost:3000/api";

const Login = () => {
  const Login = async (e) => {
    e.preventDefault();
    await axios
      .post(
        API + "/login",
        {
          email: e.target.email.value,
          password: e.target.password.value,
        },
        {
          withCredentials: true,
        }
      )
      .then((data) => console.log(data));
  };

  // cuando pido un json tengo que configurar axios asi
  // await axios.post(API + '/login', {
  //   email: e.target.email.value,
  //   password: e.target.password.value
  // }, {
  //   withCredentials: true,
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json'
  //   }
  // }

  return (
    <div className="logincontainer">
      <h1>Log In</h1>
      <form onSubmit={(e) => Login(e)}>
        <input placeholder="email" name="email" />
        <input placeholder="contraseña" name="password" />
        <button type="submit">Login</button>
      </form>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
};
export default Login;
