import { RingProgress } from "@ant-design/plots";
import { useState } from "react";

const DemoRingProgress = (props) => {
  const [value, setValue] = useState();
  const config = {
    height: 100,
    width: 100,
    autoFit: false,
    percent: props.porcent/100,
    color: ["#5B8FF9", "#e8edf334"],
  };
  return (
    <>
      <RingProgress {...config} ></RingProgress>
      {/* <p>{props.result}</p> */}
    </>
  );
};
export default DemoRingProgress;
