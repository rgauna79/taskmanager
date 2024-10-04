import { createContext, useCallback, useContext, useState } from "react";
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
  const [error, setError] = useState(null);
  const allTags = [...new Set(tasks.flatMap((task) => task.tags))];

  const getTasks = useCallback(async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error("error: " + error);
    }
  }, []);

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      // console.log(res.data)
      return res.data;
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  const createTask = async (task) => {
    try {
      const res = await createTasksRequest(task);
      setTasks([...tasks, res.data]);
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTasksRequest(id);
      if (res.status === 204) {
        setError(null);
        setTasks(tasks.filter((task) => task._id != id));
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const updateTask = async (id, task) => {
    // console.log(id, task)
    try {
      const res = await updateTasksRequest(id, task);
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const updateTaskStatus = async (id, status) => {
    try {
      const res = await updateTasksRequest(id, { status });

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? res.data : task))
      );

      setError(null);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTask,
        updateTask,
        deleteTask,
        createTask,
        getTasks,
        updateTaskStatus,
        error,
        allTags,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
