import Grafica from "../Components/Grafica";
import Input from "../Components/Input";
import ListInputs from "../Components/ListInputs";
import Total from "../Components/Total";
import "./Home.css";

const Home = () => {
  return (
    <div className="homecontainer">
      <Grafica />
      <Input />
      <ListInputs />
      <Total />
    </div>
  );
};
export default Home;
