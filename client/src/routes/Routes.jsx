import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { useEffect } from "react";
import { useGlobalStore } from "../store/store";
import Cookies from "js-cookie";

function App() {
  const { setLogged } = useGlobalStore();

  useEffect(() => {
    const login = Cookies.get("user");
    if (login) setLogged();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
