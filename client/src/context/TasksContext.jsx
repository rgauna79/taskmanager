import { createContext, useContext, useState } from "react";
import {
  createTasksRequest,
  getTaskRequest,
  getTasksRequest,
  updateTasksRequest,
  deleteTasksRequest,
} from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  //console.log(context)
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.error('error: ' + error);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      // console.log(res.data)
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async (task) => {
    const res = await createTasksRequest(task);
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTasksRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id != id));
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id, task) => {
    // console.log(id, task)
    try {
      const res = await updateTasksRequest(id, task);
      // console.log(res)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, getTask, updateTask, deleteTask, createTask, getTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
}
