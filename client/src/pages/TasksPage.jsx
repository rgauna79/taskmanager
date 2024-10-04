import { useEffect, useState } from "react";
import { useTasks } from "../context/TasksContext";
import TaskCard from "../components/tasks/TaskCard";
import { Link } from "react-router-dom";
import useFetchTasks from "../hooks/useFetchTasks.js";

function TasksPage() {
  // const { getTasks, tasks, error, allTags } = useTasks();
  const { allTags } = useTasks();
  const [filter, setFilter] = useState("all");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortOption, setSortBy] = useState("title");
  const { loading, error, tasks } = useFetchTasks();

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.status === true;
    if (filter === "pending") return task.status === false;
    if (selectedTag) return task.tags.includes(selectedTag);
    return true;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortOption === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "dueDate") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortOption === "priority") {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center ">
        <div className="spinner-border text-primary me-2" role="status"></div>
        <span>Loading Tasks</span>
      </div>
    );
  }

  if (error) return <h1>Error: {error}</h1>;
  if (tasks.length == 0) return <h1>No Tasks</h1>;
  return (
    <>
      <div className="d-flex justify-content-between align-items-center p-3 flex-wrap gap-3">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="filter" className="form-label mb-0">
            Filter Tasks:
          </label>
          <select
            id="filter"
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="d-flex align-items-center gap-2">
          <label htmlFor="tag" className="form-label mb-0">
            Filter by Tag:
          </label>
          <select
            id="tag"
            className="form-select"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="">All</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="sort" className="form-label mb-0">
            Sort by
          </label>
          <select
            id="sort"
            className="form-select"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="title">Title</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        <Link
          to="/add-task"
          className="text-white bg-primary px-4 py-2 rounded text-decoration-none"
        >
          Add Task
        </Link>
      </div>
      <div className="container">
        <div className="row">
          {sortedTasks.map((task) => (
            <div className="col-12 col-sm-12 col-lg-6 mb-4" key={task._id}>
              <TaskCard task={task} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TasksPage;
