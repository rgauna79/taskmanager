import { useEffect, useState } from "react";
import { useTasks } from "../context/TasksContext";

const fetchTasks = () => {
  const { getTasks, tasks, error } = useTasks();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        await getTasks();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [getTasks]);

  return { loading, tasks, error };
};

export default fetchTasks;
