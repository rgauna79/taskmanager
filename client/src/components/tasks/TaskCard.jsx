import { useTasks } from "../../context/TasksContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskCard({ task }) {
  const cardStyle = {
    minWidth: "28rem",
  };

  const { deleteTask } = useTasks();
  return (
    <div className="bg-secondary rounded mb-4 mx-4 p-2 container-sm" >
      <header className="d-flex justify-content-between">
        <h1 className="fs-3 font-weight-bold">{task.title}</h1>
        <div className="d-flex gap-2 align-items-center">
          <button
            onClick={() => {
              deleteTask(task._id);
            }}
            className="btn btn-danger mr-2"
          >
            delete
          </button>
          <Link to={`/tasks/${task._id}`} className="btn btn-primary">
            edit
          </Link>
        </div>
      </header>
      <p className="">{task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Due Date: {dayjs(task.dueDate).utc().format('MM/DD/YYYY')}</p>
    </div>
  );
}

export default TaskCard;
