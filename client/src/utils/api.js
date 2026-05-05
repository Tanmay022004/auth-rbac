import axios from "axios";

const API = axios.create({
  baseURL: "https://auth-rbac-8li0.onrender.com/api",
  withCredentials: true
});

export default API;