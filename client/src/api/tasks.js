import axios from "./axios";
import Cookies from "js-cookie";

export const getTasksRequest = () =>
  axios.get("/tasks", {
    headers: {
      Authorization: `Bearer ${Cookies.get("authToken")}`,
    },
  });

export const getTaskRequest = (id) =>
  axios.get(`/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("authToken")}`,
    },
  });

export const createTasksRequest = (task) =>
  axios.post("/tasks", task, {
    headers: {
      Authorization: `Bearer ${Cookies.get("authToken")}`,
    },
  });

export const updateTasksRequest = (id, task) =>
  axios.put(`/tasks/${id}`, task, {
    headers: {
      Authorization: `Bearer ${Cookies.get("authToken")}`,
    },
  });

export const deleteTasksRequest = (id) =>
  axios.delete(`/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("authToken")}`,
    },
  });
