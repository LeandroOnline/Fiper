import axios from "axios";

const dolarBlue = async () => {
  return await axios
    .get("https://api.bluelytics.com.ar/v2/latest")
    .then((res) => res.data.blue.value_sell);
};

export default dolarBlue;
