import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
  createTask,
  getTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.use(auth);

router.get("/tasks", getTasks);

router.get("/tasks/:id", getTask);

router.post("/tasks", validateSchema(createTaskSchema), createTask);

router.delete("/tasks/:id", deleteTask);

router.put("/tasks/:id", updateTask);

export default router;
