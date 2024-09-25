import { useTasks } from "../../context/TasksContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskCard({ task }) {
  const { deleteTask } = useTasks();
  return (
    <div className="bg-secondary rounded p-3">
      <header className="d-flex justify-content-between align-items-start">
        <h1 className="fs-3 font-weight-bold">{task.title}</h1>
        <div className="d-flex gap-2 align-items-center">
          <button
            onClick={() => {
              deleteTask(task._id);
            }}
            className="btn btn-danger"
          >
            delete
          </button>
          <Link to={`/tasks/${task._id}`} className="btn btn-primary">
            edit
          </Link>
        </div>
      </header>
      <p className="small">{task.description}</p>
      <p className="small">Priority: {task.priority}</p>
      <p className="small">
        Due Date: {dayjs(task.dueDate).utc().format("MM/DD/YYYY")}
      </p>
    </div>
  );
}

export default TaskCard;
