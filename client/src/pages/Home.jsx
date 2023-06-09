import AreaGraph from "../components/AreaGraph";
import ColumnGraph from "../components/ColumnGraph";
import Input from "../components/Input";
import ListInputs from "../components/ListInputs";
import Total from "../components/Total";
import useGlobalStore from "../store/Store";
import DolarBlue from "../components/DolarBlue";
import Interest from "../components/Interest";
import ProfitsAndLosses from "../components/ProfitsAndLosses";
import NoLogged from "../components/NoLogged";
import "./Home.css";

const Home = () => {
  const login = useGlobalStore((state) => state.login);

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
            <ProfitsAndLosses />
            <DolarBlue />
            <Interest />
          </div>
          <ListInputs />
        </>
      ) : (
        <NoLogged />
      )}
    </div>
  );
};
export default Home;
