import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:7000/api",
  baseURL:"https://piintegration-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;