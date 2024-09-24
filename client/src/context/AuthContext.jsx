import { createContext, useState, useContext, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  logoutRequest,
} from "../api/auth";
import Cookies from "js-cookie";
// import { useCookies } from "react-cookie";
// import { NODE_ENV } from "../api/config";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
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

      setIsAuthenticated(true);
      setUser(res.data);
      sessionStorage.setItem("token", res.data.token);

      // setCookie("token", res.data.token, {
      //   path: "/",
      //   secure: NODE_ENV === "production",
      //   sameSite: NODE_ENV === "production" ? "None" : "Lax",
      // });
      // }
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

  const logout = async () => {
    sessionStorage.removeItem("token");
    Cookies.remove("token");
    // removeCookie("token");
    await logoutRequest();
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
      const cookies = sessionStorage.getItem("token");
      // console.log("checkLogin cookies: ", cookies);
      if (!cookies) {
        // console.log("no token");
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        const res = await verifyTokenRequest(cookies);
        // console.log(res)
        if (!res.data) {
           setIsAuthenticated(false);
           sessionStorage.removeItem("token");
           return setUser(null);
        }
        setIsAuthenticated(true);
        setUser(res.data);
      } catch (error) {
        console.log("error :" + error);
        setIsAuthenticated(false);
        sessionStorage.removeItem("token");

      } finally {
        setLoading(false);
      }
    }

    checkLogin();
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
