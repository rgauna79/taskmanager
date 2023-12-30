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

router.get("/tasks", auth, getTasks);

router.get("/tasks/:id", auth, getTask);

router.post(
  "/tasks",
  auth,
  validateSchema(createTaskSchema),
  createTask
);

router.delete("/tasks/:id", auth, deleteTask);

router.put("/tasks/:id", auth, updateTask);

export default router;
