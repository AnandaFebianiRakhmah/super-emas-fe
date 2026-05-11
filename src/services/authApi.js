// src/services/authApi.js
import axios from "axios";
const authApi = axios.create({
  baseURL: "/api/auth", // Use relative path for proxy  withCredentials: true, // ← this tells axios to include cookies on every request
});
export default authApi;
