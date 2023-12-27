import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
dayjs.extend(utc);

export function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("priority", task.priority);
        setValue(
          "dueDate",
          task.dueDate ? dayjs(task.dueDate).utc().format("YYYY-MM-DD") : ""
        );
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      dueDate: data.dueDate ? dayjs.utc(data.dueDate).format() : dayjs.utc().format(),
    }
    if (params.id) {
     
      updateTask(dataValid);
    } else {
      
      createTask(dataValid);
    }
    navigate("/tasks");
  });
  return (
    <div className="d-flex align-items-center justify-content-center pb-4 flex-grow-1">
      <div className="bg-secondary  p-4 rounded">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Title"
            {...register("title")}
            autoFocus
            className="w-100 px-4 py-2 rounded my-2"
          />
          <textarea
            name=""
            id=""
            rows="3"
            placeholder="Description"
            {...register("description")}
            className="w-100 px-4 py-2 rounded"
          ></textarea>
          <fieldset className="py-2 d-flex">
            <label
              htmlFor="priority"
              className="d-flex flex-grow-1  mx-4 align-items-center justify-content-end"
            >
              Set priority
            </label>
            <select name="priority" id="" {...register("priority")}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </fieldset>
          <fieldset className="py-2 d-flex">
            <label
              htmlFor="dueDate"
              className="d-flex flex-grow-1  mx-4 align-items-center justify-content-end"
            >
              Due Date
            </label>
            <input type="date" name="dueDate" id="" {...register("dueDate")} />
          </fieldset>
          <button className="btn bg-primary">Save</button>
        </form>
      </div>
    </div>
  );
}
