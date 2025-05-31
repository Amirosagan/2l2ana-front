import axios from "axios";

const api = axios.create({
  baseURL: "https://mettamena.runasp.net/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

export default api;
