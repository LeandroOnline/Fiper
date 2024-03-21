// const API = "https://fipe-cn67.vercel.app/api";
const API = window.location.hostname === "localhost" ? "/api" : "/api";

export default API;
