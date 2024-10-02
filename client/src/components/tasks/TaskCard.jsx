import { useTasks } from "../../context/TasksContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import React from "react";
import { toast } from "react-toastify";

dayjs.extend(utc);

const priorityStyles = {
  high: "bg-danger text-white",
  medium: "bg-warning text-dark",
  low: "bg-success text-white",
};

function TaskCard({ task }) {
  const { deleteTask, updateTaskStatus } = useTasks();

  function handleStatusChange() {
    const newStatus = !task.status;
    updateTaskStatus(task._id, newStatus);
    toast.success(
      `Task "${task.title}" marked as ${
        newStatus ? "completed" : "incomplete"
      }.`
    );
  }

  function handleDelete() {
    deleteTask(task._id);
    toast.info(`Task "${task.title}" has been deleted.`);
  }

  const isExpired = dayjs().isAfter(dayjs(task.dueDate).utc());

  return (
    <div className="bg-secondary rounded p-3">
      <header className="d-flex justify-content-between align-items-center">
        <h1 className="fs-3 font-weight-bold mb-0">{task.title}</h1>
        <div className="d-flex gap-2 align-items-center">
          <button onClick={handleDelete} className="btn btn-danger">
            Delete
          </button>
          <Link to={`/tasks/${task._id}`} className="btn btn-primary">
            Edit
          </Link>
        </div>
      </header>
      <p className="small my-1">{task.description}</p>

      <div className="d-flex align-items-center flex-wrap">
        <p className="small my-1 me-2">Priority: </p>
        <span
          className={`badge ${priorityStyles[task.priority] || "bg-secondary"}`}
        >
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
      </div>

      <div className="tags d-flex flex-wrap align-items-center">
        <p className="small my-1 me-2">Tags: </p>
        {task.tags &&
          task.tags.map((tag) => (
            <span key={tag} className="badge bg-info me-1 ">
              {tag}
            </span>
          ))}
      </div>

      <p className="small my-1">
        Due Date: {dayjs(task.dueDate).utc().format("MM/DD/YYYY")}
      </p>
      {isExpired && <p className="small text-danger">This task is overdue!</p>}
      <label className="form-check-label " htmlFor={`task-status-${task._id}`}>
        <input
          id={`task-status-${task._id}`}
          type="checkbox"
          checked={task.status}
          onChange={handleStatusChange}
          className="form-check-input me-2"
          disabled={isExpired && task.status}
        />
        {task.status ? "Completed" : "Mark as completed"}
      </label>
    </div>
  );
}

export default TaskCard;
