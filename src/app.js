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
  const servingPath = path.resolve("client");

  app.use(express.static(servingPath));

  app.get("*", (req, res) => {
    console.log(path.resolve(servingPath, "index.html"));
    res.sendFile(path.resolve(servingPath, "index.html"));
  });
}
app.use("/", (req, res, next) => {
  res.json({ message: "Api is running" });
    

});

export default app;
