import API from "./apiUrl";
import axios from "axios";

const getNotes = async (e) =>
  await axios
    .post(
      API + "/getNotes",
      {
        token: sessionStorage.getItem("user"),
      },
      { timeout: 6000 }
    )
    .then((data) => data.data)

export default getNotes;
