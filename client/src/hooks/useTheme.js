import { useEffect, useState } from "react";

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-bs-theme", "dark"); // Cambiar tema a oscuro
    } else {
      setIsDarkMode(false);
      document.documentElement.setAttribute("data-bs-theme", "light"); // Cambiar tema a claro
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      document.documentElement.setAttribute(
        "data-bs-theme",
        newTheme ? "dark" : "light"
      ); // Cambiar tema
      return newTheme;
    });
  };

  return { isDarkMode, toggleTheme };
};
