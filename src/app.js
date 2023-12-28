import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";

const app = express();

app.use(
  cors({
    //Cors used Localhost
    origin: "http://localhost:5173",
    
    //Cors used with web service
    // origin: "https://taskmanager-15ow.onrender.com",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/", authRoutes);
app.use("/api", taskRoutes);

export default app;
