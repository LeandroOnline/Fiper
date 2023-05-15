import AreaGraph from "../components/AreaGraph";
import ColumnGraph from "../components/ColumnGraph";
import Input from "../components/Input";
import ListInputs from "../components/ListInputs";
import Total from "../components/Total";
import useGlobalStore from "../store/Store";
import TinyArea from "../components/TinyAreaInputPorcent";
import "./Home.css";
import DolarBlue from "../components/DolarBlue";

const Home = () => {
  const login = useGlobalStore((state) => state.login);



  console.log("Home");
  return (
    <div className="homecontainer">
      {login ? (
        <>
          <div className="inputsGraph">
            <div className="inputTotal">
              <Input />
              <Total />
            </div>

            <div className="graphs">
              <ColumnGraph />
              <AreaGraph />
            </div>
          </div>
          <div className="tinys">
            {/* <TinyArea dolarBlue={true} /> */}
            <DolarBlue />
            <TinyArea />
            <TinyArea />
          </div>
          <ListInputs />
        </>
      ) : (
        <>Usuario no Logueado</>
      )}
    </div>
  );
};
export default Home;
