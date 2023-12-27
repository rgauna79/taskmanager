import Task from "../models/task.models.js";

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
  const { title, description, dueDate, priority, status } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
      user: req.user.id,
    });

    const taskSaved = await newTask.save();

    res.json({
      title: taskSaved.title,
      description: taskSaved.description,
      dueDate: taskSaved.dueDate,
      priority: taskSaved.priority,
      status: taskSaved.status,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("user");
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};

export const updateTask = async (req, res) => {
 
  try {
    
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Task not find it" });
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};
