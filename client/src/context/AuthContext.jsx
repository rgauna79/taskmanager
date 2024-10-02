import { createContext, useState, useContext, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  logoutRequest,
} from "../api/auth";
import Cookies from "js-cookie";

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

  const isProduction = process.env.NODE_ENV === "production";
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
      setErrors(
        error.response?.data ? error.response.data : ["Registration error"]
      );
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);

      setIsAuthenticated(true);
      setUser(res.data);

      // Set the token in cookies
      Cookies.set("authToken", res.data.token, {
        // path: "/",
        // httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      });

      //set token to session storage
      sessionStorage.setItem("token", res.data.token);
    } catch (error) {
      console.log(error);
      setErrors(
        error.response?.data.message
          ? error.response.data.message
          : error.response.data
      );

      // }
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      Cookies.remove("token", { path: "/" });
      sessionStorage.removeItem("token");
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  // useEffect(() => {
  //   if (errors.length > 0) {
  //     const timer = setTimeout(() => {
  //       setErrors([]);
  //     }, 5000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const token = Cookies.get("authToken") || sessionStorage.getItem("token");
      
      console.log("token for check login from cookie: ", Cookies.get("authToken"));
      console.log("token for check login from session: ", sessionStorage.getItem("token"));

      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest(token);
        if (res.data) {
          setIsAuthenticated(true);
          setUser(res.data);
        } else {
          throw new Error("Invalid token response");
        }
      } catch (error) {
        console.log("Error verifying token:", error.response.data.message);
        setIsAuthenticated(false);
        Cookies.remove("token", { path: "/" });
        setUser(null);
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
