import { createContext, useEffect, useState } from "react";
import Routes from "../routes/Routes";
import Cookies from "js-cookie";

export const context = createContext();

const Contexts = () => {
  const [reset, setReset] = useState(false);
  const [logged, setLogged] = useState(false);
  const ingresos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const egresos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const neto = 0;

  useEffect(() => {
    const login = Cookies.get("user");
    if (login) setLogged(true);
  }, []);

  return (
    <context.Provider
      value={{ reset, setReset, logged, setLogged, ingresos, egresos, neto }}
    >
      <Routes />
    </context.Provider>
  );
};
export default Contexts;
