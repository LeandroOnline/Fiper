import Grafica from "../components/GraficaAnualMixto";
import GraficaTwo from "../components/GraficaAnualNeto";
import Input from "../components/Input";
import ListInputs from "../components/ListInputs";
import Total from "../components/Total";
import useGlobalStore from "../store/Store";
import "./Home.css";

const Home = () => {
  const logged = useGlobalStore((state) => state.logged);
  const login = useGlobalStore((state) => state.login);

  console.log("Home");
  return (
    <div className="homecontainer">
      {login && logged ? (
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
