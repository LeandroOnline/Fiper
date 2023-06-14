import API from "./apiUrl";
import axios from "axios";

const update = async (id, title, text) =>
  await axios
    .put(
      API + "/updateNote/" + id,
      {
        title: title,
        text: text,
        token: sessionStorage.getItem("user"),
      },
      { timeout: 6000 }
    )
    .then((data) => data.data)

export default update;
