import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";
import { useCookies } from "react-cookie";
import { NODE_ENV } from "../api/config";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
        setToken(res.data.token);
        setCookie("token", res.data.token);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data) {
        setErrors(error.response.data);
      }
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log("Signin User data: ", res);
      setIsAuthenticated(true);
      setUser(res.data);
      setToken(res.data.token);
      Cookies.set("token", res.data.token);
      setCookie("token", res.data.token, {
        path: "/",
        secure: NODE_ENV === "production",
        sameSite: NODE_ENV === "production" ? "None" : "Lax",
      });
      console.log("Signin cookies: ", cookies);
      console.log("Environment: ", NODE_ENV);
    } catch (error) {
      console.log(error);
      if (error.response.data) {
        if (Array.isArray(error.response.data)) {
          return setErrors(error.response.data);
        }
      }
      setErrors([error.response.data.message]);
    }
  };

  const logout = () => {
    removeCookie("token", { path: "/" });
    // Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const tokenFromCookie = cookies.token;

      if (!tokenFromCookie) {
        console.log("no token");
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        const res = await verifyTokenRequest(tokenFromCookie);
        // console.log(res)
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log("error :" + error);
        setIsAuthenticated(false);
        setLoading(false);
      }
    }
    checkLogin(NODE_ENV);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        user,
        isAuthenticated,
        errors,
        loading,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
