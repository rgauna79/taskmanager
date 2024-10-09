import { createContext, useCallback, useContext, useState, useEffect } from "react";
import {
  createTasksRequest,
  getTaskRequest,
  getTasksRequest,
  updateTasksRequest,
  deleteTasksRequest,
} from "../api/tasks";
import { useAuth } from "./AuthContext";
import { date } from "zod";

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
  const { isAuthenticated } = useAuth();

  const allTags = [...new Set(tasks.flatMap((task) => task.tags))];

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    } else if (isAuthenticated) {
      getTasks();
    }
  },[isAuthenticated] );

  const getTasks = useCallback(async () => {
    if ( isAuthenticated ) {
      try {
        const res = await getTasksRequest();
        setTasks(res.data);
        setError(null);
      } catch (error) {
        setError(error.message);
        console.error("error: " + error);
      }
    } else {

    }
    
  }, [isAuthenticated]);

  const getTask = async (id) => {
    if (isAuthenticated) {
      try {
        const res = await getTaskRequest(id);
        // console.log(res.data)
        return res.data;
      } catch (error) {
        setError(error.message);
        console.error(error.message);
      }
    } else {
      
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const response = storedTasks.find((task) => task._id === Number(id))
      
      return { data: response};
    }
  };

  const createTask = async (task) => {
    if (isAuthenticated) {
      try {
        const res = await createTasksRequest(task);
        setTasks([...tasks, res.data]);
        setError(null);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    } else {
      const newTask = {...task, _id: Date.now() }
      setTasks([...tasks, newTask]);
      // alert("create new task")
    }
  };

  const deleteTask = async (id) => {
    if (isAuthenticated) {
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
    } else {
      setTasks(tasks.filter((task) => task._id != id));

    }
  };

  const updateTask = async (id, task) => {
    // console.log(id, task)
    if (isAuthenticated) {
      try {
        const res = await updateTasksRequest(id, task);
        setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
        setError(null);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    } else {
      setTasks(tasks.map((t) => (String(t._id) === String(id) ? { ...t, ...task } : t)));
    }
  };

  const updateTaskStatus = async (id, status) => {
    if (isAuthenticated) {
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
    } else {
      setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === id ? {...task, status} : task))
        ); 
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
