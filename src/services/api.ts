import axios from "axios";

const api = axios.create({
  baseURL: "https://syspay-production.up.railway.app",
});

export default api;
