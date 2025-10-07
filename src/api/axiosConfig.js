// src/api/axiosConfig.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://boostrap-0eub.onrender.com",
});

export default api;
