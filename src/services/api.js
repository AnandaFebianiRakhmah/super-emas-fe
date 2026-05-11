// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://super-emas-be.onrender.com",  //   baseURL: "http://localhost:5000",
  withCredentials: true, // send cookies
});

export default api;