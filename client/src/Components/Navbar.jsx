import { Link } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import { context } from "../App";

const Navbar = () => {
  const { logged, setLogged } = useContext(context);
  return (
    <div className="navcontainer">
      <h1 className="title">~ FIPE ~</h1>
      <div className="menu">
        {logged ? (
          <>
            <Link to="/">DashBoard</Link>

            <div onClick={() => setLogged(false)}>Log Out</div>
          </>
        ) : (
          <>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
};
export default Navbar;
