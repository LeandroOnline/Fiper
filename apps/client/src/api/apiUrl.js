// const API = "https://fipe-cn67.vercel.app/api";
const API =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/api"
    : "https://fipeapi.savat.ar/api";

export default API;
