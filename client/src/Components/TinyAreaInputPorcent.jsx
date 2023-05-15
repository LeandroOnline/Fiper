import { TinyArea } from "@ant-design/plots";
import "./TinyArea.css";
import useGlobalStore from "../store/Store";
import areaDataFormat from "../helpers/areaDataFormat"

const DemoTinyArea = (props) => {
  const { inputs } = useGlobalStore();

  console.log(inputs);
  // const allData= 
  const data = [264, 417, 438, 887, 309, 397, 550];
  const config = {
    height: 100,
    autoFit: false,
    data,
    smooth: true,
    areaStyle: {
      fill: "#30b5076e",
    },
  };

  return (
    <div className="tinycontainer">
      <TinyArea {...config} />
    </div>
  );
};
export default DemoTinyArea;
