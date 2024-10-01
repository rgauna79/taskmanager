import Task from "../models/task.models.js";
import { handleResponse } from "../middlewares/response.middleware.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).populate("user");
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status, tags } = req.body;
    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      status: false,
      user: req.user.id,
      tags,
    });

    await newTask.save();

    res.json(newTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("user");
    if (!task) {
      return handleResponse(res, { message: "Task not found" }, 404);
    }
    return handleResponse(res, task);
  } catch (error) {
    return handleResponse(res, { message: error.message }, 500);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    if (!deleteTask) return res.status(404).json({ message: "Task not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const taskUpdated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!taskUpdated)
      return res.status(404).json({ message: "Task not find it" });
    return res.json(taskUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
