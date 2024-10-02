import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useTaskLoader } from "../hooks/useTaskLoader";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export function TaskFormPage() {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const { createTask, updateTask, error } = useTasks();
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const { error: loadError } = useTaskLoader(params.id, setValue);

  useEffect(() => {
    const taskData = getValues();
    if (taskData.tags) {
      setTags(taskData.tags);
    }
  }, [getValues]);

  const handleTagsChange = (e) => {
    const newTags = e.target.value.split(",");
    setTags(newTags);
    setValue("tags", newTags);
  };

  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      dueDate: data.dueDate
        ? dayjs.utc(data.dueDate).format("YYYY-MM-DD")
        : dayjs.utc().format("YYYY-MM-DD"),
      tags,
    };
    if (params.id) {
      updateTask(params.id, dataValid)
        .then(() => {
          toast.success("Task updated successfully!");
        })
        .catch(() => {
          toast.error("Failed to update task.");
        });
    } else {
      createTask(dataValid)
        .then(() => {
          toast.success("Task created successfully!");
        })
        .catch(() => {
          toast.error("Failed to update task.");
        });
    }
    navigate("/tasks");
  });

  return (
    <div className="d-flex align-items-center justify-content-center pb-4 flex-grow-1">
      <div className="bg-secondary p-4 rounded">
        {/* load error */}
        {loadError && <div className="alert alert-danger">{loadError}</div>}

        {/* context error */}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Title"
            {...register("title")}
            autoFocus
            className="w-100 px-4 py-2 rounded my-2"
          />
          <textarea
            rows="3"
            placeholder="Description"
            {...register("description")}
            className="w-100 px-4 py-2 rounded"
          />
          <fieldset className="py-2 d-flex">
            <label
              htmlFor="priority"
              className="d-flex flex-grow-1 mx-4 align-items-center justify-content-end"
            >
              Set priority
            </label>
            <select name="priority" {...register("priority")}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </fieldset>
          <fieldset className="py-2 d-flex">
            <label
              htmlFor="dueDate"
              className="d-flex flex-grow-1 mx-4 align-items-center justify-content-end"
            >
              Due Date
            </label>
            <input type="date" name="dueDate" {...register("dueDate")} />
          </fieldset>
          <fieldset className="py-2 d-flex">
            <label htmlFor="tags" className="form-label">
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              className="form-control"
              value={tags.join(",")}
              onChange={handleTagsChange}
            />
          </fieldset>
          <button className="btn bg-primary">Save</button>
        </form>
      </div>
    </div>
  );
}
