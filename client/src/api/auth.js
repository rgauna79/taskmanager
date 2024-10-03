import axios from "./axios";
import Cookies from "js-cookie";

export const registerRequest = (user) => axios.post(`auth/register`, user);

export const loginRequest = (user) => axios.post(`auth/login`, user);

export const verifyTokenRequest = () =>
  axios.get("auth/verify", {
    headers: {
      Authorization: `Bearer ${Cookies.get("authToken")}`,
    },
  });

export const logoutRequest = () => axios.post("auth/logout");

// export const logoutRequest = () => axios
