// src/services/api.js
import axios from "axios";

const API_BASE_URL = "https://super-emas-be.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default api;
