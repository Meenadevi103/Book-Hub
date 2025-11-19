import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:8000/api",  // Change from 8001 to 8000
  // Base URL for your Django API
  headers: {
    "Content-Type": "application/json",  // Set content-type to JSON
  },
});

export default api;
