import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import TaskCard from "../components/tasks/TaskCard";
import { Link } from "react-router-dom";

function TasksPage() {
  const { getTasks, tasks, error } = useTasks();
  useEffect(() => {
    getTasks();
  }, []);

  if (error) return <h1>Error: {error}</h1>;
  if (tasks.length == 0) return <h1>No Tasks</h1>;
  return (
    <>
      <div className="w-100 p-3">
        <Link
          to="/add-task"
          className="text-white bg-primary px-4 py-1 rounded text-decoration-none"
        >
          Add Task
        </Link>
      </div>
      <div className="container">
        <div className="row">
          {tasks.map((task) => (
            <div className="col-12 col-sm-12 col-lg-6 mb-4" key={task.id}>
              <TaskCard task={task} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TasksPage;
