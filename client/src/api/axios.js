import axios from "axios";
import { VITE_BACKEND_URL } from "./config";

// console.log(VITE_BACKEND_URL);

const instance = axios.create({
  baseURL: VITE_BACKEND_URL,
  withCredentials: true,
});

export default instance;
