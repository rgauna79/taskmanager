import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { FRONTEND_URL } from "./config.js";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import path from "path";

const app = express();
console.log(FRONTEND_URL);
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve("client", "dist")));

  app.get("*", (req, res) => {
    console.log(path.resolve("client", "dist", "index.html"));
    res.sendFile(path.resolve("client", "dist", "index.html"));
  });
}

// Example route to test cookie setting
app.get("/test-cookie", (req, res) => {
  const token = "test-token"; // Replace with your actual token
  res.cookie("token", token, {
    httpOnly: isProduction,
    secure: isProduction, // Set to true in production with HTTPS
    sameSite: isProduction ? "None" : "Lax", // Set SameSite attribute to None or Lax
  });
  res.send("Cookie set successfully!");
});

export default app;
