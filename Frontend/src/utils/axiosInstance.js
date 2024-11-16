import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;
console.log(API_URL);

const axiosInstance = axios.create({
  baseURL: API_URL, // Set the base URL for all requests
  headers: {
    "Content-Type": "application/json", // Default headers (optional)
  },
});

export default axiosInstance;
