import axios from "./axios";

export const getTasksRequest = () => axios.get("/tasks", {
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,  
  },
});

export const getTaskRequest = (id) => axios.get(`/tasks/${id}`, {
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,  
  },
});

export const createTasksRequest = (task) => axios.post("/tasks", task, {
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`, 
  },
});

export const updateTasksRequest = (id, task) => axios.put(`/tasks/${id}`, task, {
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,  
  },
});

export const deleteTasksRequest = (id) => axios.delete(`/tasks/${id}`, {
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,  
  },
});
