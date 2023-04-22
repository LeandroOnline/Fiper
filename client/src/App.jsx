import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";

export const context = createContext();

function App() {
  const [reset, setReset] = useState(false);

  return (
    <div className="App">
      <context.Provider value={{ reset, setReset }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </context.Provider>
    </div>
  );
}

export default App;
