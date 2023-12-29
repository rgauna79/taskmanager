import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import TaskCard from "../components/tasks/TaskCard";
import { useAuth } from "../context/AuthContext";
function TasksPage() {
  const { getTasks, tasks } = useTasks();
  const { isAuthenticated, logout, user } = useAuth();

  console.log(isAuthenticated, user)
  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.lenght == 0) return <h1>No Tasks</h1>;
  return (
    <div className=" d-flex mx-auto flex-wrap justify-content-center">
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id}></TaskCard>
      ))}
    </div>
  );
}

export default TasksPage;
