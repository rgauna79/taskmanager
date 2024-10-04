import { useEffect } from "react";
import Cookies from "js-cookie";
import { verifyTokenRequest } from "../api/auth";

const useCheckLogin = (setIsAuthenticated, setUser, setLoading) => {
  useEffect(() => {
    async function checkLogin() {
      const token = Cookies.get("authToken");
      setLoading(true);

      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest();
        if (res.data) {
          setIsAuthenticated(true);
          setUser(res.data);
        } else {
          throw new Error("Invalid token response");
        }
      } catch (error) {
        setIsAuthenticated(false);
        Cookies.remove("authToken");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkLogin();
  }, [setIsAuthenticated, setUser, setLoading]);
};

export default useCheckLogin;
