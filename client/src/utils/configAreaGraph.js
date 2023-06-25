const config = (data) => ({
  data,
  autoFit: true,
  smooth: true,
  xField: "timePeriod",
  yField: "value",
  xAxis: {
    range: [0, 1],
  },
});

export default config;
