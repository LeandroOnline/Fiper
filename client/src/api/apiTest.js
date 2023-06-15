import API from "./apiUrl";
import axios from "axios";

const apiTest = async (e) =>
  await axios
    .get(API + "/test", { timeout: 6000 })
    .then((data) => data.data)
    .catch((err) => (err.code === "ECONNABORTED" ? "limitTime" : err));

export default apiTest;
