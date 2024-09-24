// hooks/useTaskLoader.js
import { useEffect, useState } from "react";
import { useTasks } from "../context/TasksContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function useTaskLoader(taskId, setValue) {
  const { getTask } = useTasks();
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTask() {
      if (taskId) {
        try {
          const task = await getTask(taskId);
          setValue("title", task.title);
          setValue("description", task.description);
          setValue("priority", task.priority);
          setValue(
            "dueDate",
            task.dueDate ? dayjs(task.dueDate).utc().format("YYYY-MM-DD") : ""
          );
        } catch (error) {
          console.error("Failed to load task:", error);
          setError("Task not found or could not be loaded.");
        }
      }
    }
    loadTask();
  }, [taskId, setValue, getTask]);

  return { error };
}
