import axios from "axios";

const api = axios.create({
  baseURL: "https://api.2l2ana.com/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    "Cache-Control": "no-cache",  // Ensure no caching
    Pragma: "no-cache",           // HTTP 1.0 backward compatibility
    Expires: "0",                 // Proxies and caches should not cache the response
  },
});

export default api;
