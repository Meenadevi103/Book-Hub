import axios from "axios";

const api = axios.create({
  baseURL: "/api",  // Relative URL since both are on same domain
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
