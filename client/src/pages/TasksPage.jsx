import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import TaskCard from "../components/tasks/TaskCard";

function TasksPage() {
  const { getTasks, tasks, error } = useTasks();
  useEffect(() => {
    getTasks();
  }, []);

  if (error) return <h1>Error: {error}</h1>;
  if (tasks.length == 0) return <h1>No Tasks</h1>;
  return (
    <div className=" d-flex mx-auto flex-wrap justify-content-center container-sm">
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id}></TaskCard>
      ))}
    </div>
  );
}

export default TasksPage;
