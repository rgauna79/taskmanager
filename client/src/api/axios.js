import axios from "axios";

const instance = axios.create({
  //connection to backend in localhost
  // baseURL: "http://localhost:4000/api",

  //connection to backend in web service
  baseURL: "https://task-manager-p62m.onrender.com/api",
  withCredentials: true,
});

export default instance;
