import "./Grafica.css";
import { useEffect, useState } from "react";
import columnDataFormat from "../helpers/columnDataFormat";
import { Column } from "@ant-design/plots";
import useGlobalStore from "../store/Store";

const ColumnGraph = () => {
  const { inputs } = useGlobalStore();
  const [graph, setGraph] = useState("graph");

  // const data = columnDataFormat(inputs);
  // useEffect(() => {}, [inputs]);

  console.log("ColumnGraph");


  const data = [
    {
      name: "Ingresos",
      月份: "Jan.",
      月均降雨量: 18.9,
    },
    {
      name: "Ingresos",
      月份: "Feb.",
      月均降雨量: 28.8,
    },
    {
      name: "Egresos",
      月份: "Jan.",
      月均降雨量: 39.3,
    },
    {
      name: "Egresos",
      月份: "Feb.",
      月均降雨量: 39.3,
    },
  ];
  const config = {
    data,
    isGroup: true,
    xField: "月份",
    yField: "月均降雨量",
    seriesField: "name",

    /** 设置颜色 */
    //color: ['#1ca9e6', '#f88c24'],

    /** 设置间距 */
    // marginRatio: 0.1,
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: "interval-adjust-position",
        }, // 数据标签防遮挡
        {
          type: "interval-hide-overlap",
        }, // 数据标签文颜色自动调整
        {
          type: "adjust-color",
        },
      ],
    },
  };
  return <Column {...config} />;
};
export default ColumnGraph;
