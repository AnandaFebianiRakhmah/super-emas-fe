// src/services/authApi.js
import axios from "axios";

const API_BASE_URL = "https://super-emas-be.onrender.com";

const authApi = axios.create({
  baseURL: `${API_BASE_URL}/api/auth`,
  withCredentials: true,
});

export default authApi;
