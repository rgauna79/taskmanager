// TasksPage.jsx
import { useEffect, useState } from "react";
import { useTasks } from "../context/TasksContext";
import TaskCard from "../components/tasks/TaskCard";
import { Link } from "react-router-dom";
import useFetchTasks from "../hooks/useFetchTasks.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Collapse, Button, Container, Row, Col, Form, Card } from "react-bootstrap";

function TasksPage() {
  const { allTags } = useTasks();
  const [filter, setFilter] = useState("all");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortOption, setSortBy] = useState("title");
  const { loading, error, tasks } = useFetchTasks();
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSortChange = (e) => setSortBy(e.target.value);

  const filteredTasks = tasks.filter((task) => {
    const titleMatch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    if (!titleMatch) return false;
    if (filter === "completed") return task.status === true;
    if (filter === "pending") return task.status === false;
    if (selectedTag) return task.tags.includes(selectedTag);
    return true;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortOption === "title") return a.title.localeCompare(b.title);
    if (sortOption === "dueDate") return new Date(a.dueDate) - new Date(b.dueDate);
    if (sortOption === "priority") {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <div className="spinner-border text-primary me-2" role="status"></div>
        <span>Loading Tasks</span>
      </div>
    );
  }

  if (error) return <h1 className="text-center text-danger">Error: {error}</h1>;

  if (tasks.length === 0) {
    return (
      <Container className="text-center mt-5">
        <h1>No Tasks</h1>
        <Link
          to="/add-task"
          className="btn btn-primary mt-3"
        >
          Add Task
        </Link>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      {/* Barra Superior con "Add Task" y "Search" */}
      <Row className="align-items-center mb-4">
        <Col md={6} className="mb-3 mb-md-0">
          <Link
            to="/add-task"
            className="btn btn-primary"
          >
            Add Task
          </Link>
        </Col>
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>

      {/* Contenedor de Filtros con Toggle */}
      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <h5 className="me-2 mb-0">Filters</h5>
                <Button
                  variant="outline-primary"
                  onClick={() => setShowFilters(!showFilters)}
                  aria-controls="filters-collapse"
                  aria-expanded={showFilters}
                  size="sm"
                  className="p-1"
                >
                  <FontAwesomeIcon icon={showFilters ? faMinus : faPlus} />
                </Button>
              </div>
            </Card.Header>
            <Collapse in={showFilters}>
              <Card.Body id="filters-collapse">
                <Row>
                  <Col md={4} className="mb-3">
                    <Form.Label htmlFor="filter">Status</Form.Label>
                    <Form.Select
                      id="filter"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                    </Form.Select>
                  </Col>

                  <Col md={4} className="mb-3">
                    <Form.Label htmlFor="tag">Tag</Form.Label>
                    <Form.Select
                      id="tag"
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                    >
                      <option value="">All</option>
                      {allTags.map((tag) => (
                        <option key={tag} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>

                  <Col md={4} className="mb-3">
                    <Form.Label htmlFor="sort">Sort by:</Form.Label>
                    <Form.Select
                      id="sort"
                      value={sortOption}
                      onChange={handleSortChange}
                    >
                      <option value="title">Title</option>
                      <option value="dueDate">Due Date</option>
                      <option value="priority">Priority</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Card.Body>
            </Collapse>
          </Card>
        </Col>
      </Row>

      {/* Lista de Tareas */}
      <Row>
        {sortedTasks.map((task) => (
          <Col key={task._id} xs={12} sm={6} lg={4} className="mb-4">
            <TaskCard task={task} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default TasksPage;
