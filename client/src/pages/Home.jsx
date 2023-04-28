import Grafica from "../Components/Grafica";
import Input from "../Components/Input";
import ListInputs from "../Components/ListInputs";
import Total from "../Components/Total";
import "./Home.css";

const Home = () => {
  return (
    <div className="homecontainer">
      <div>
        <Input />
        <Total />
        <progress max="100" value="80" />
        <br />
        <meter value="75" min="0" max="100"></meter>
        <br />
      </div>

      <ListInputs />

      <Grafica />
    </div>
  );
};
export default Home;
