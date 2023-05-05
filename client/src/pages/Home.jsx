import { useContext } from "react";
import Grafica from "../components/GraficaAnualMixto";
import GraficaTwo from "../components/GraficaAnualNeto";
import Input from "../components/Input";
import ListInputs from "../components/ListInputs";
import Total from "../components/Total";
import "./Home.css";
import { context } from "../contexts/Contexts";

const Home = () => {
  const { logged } = useContext(context);
  return (
    <div className="homecontainer">
      {logged ? (
        <>
          <div>
            <Input />
            <Total />
            <progress max="100" value="80" />
          </div>
          <ListInputs />
          <div>
            <Grafica />
            <GraficaTwo />
          </div>
        </>
      ) : (
        <>Usuario no Logueado</>
      )}
    </div>
  );
};
export default Home;
