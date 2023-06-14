import API from "./apiUrl";
import axios from "axios";

const getNotes = async (title, text) =>
  await axios
    .post(
      API + "/addNote",
      {
        title: title,
        text: text,
        token: sessionStorage.getItem("user"),
      },
      { timeout: 6000 }
    )
    .then((data) => data.data)

export default getNotes;
