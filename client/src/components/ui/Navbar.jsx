import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Navbar, Nav } from "react-bootstrap";

function CustomNavbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <Navbar bg="secondary" expand="lg" className="my-1 mb-3 rounded p-2">
      <Navbar.Brand>
        <Link to={isAuthenticated ? "/tasks" : "/"} className="text-white text-decoration-none">
          <h1 className="fs-1 fw-bold">Task manager</h1>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto mr-3 align-items-end gap-2 py-1">
          {isAuthenticated ? (
            <>
              <Nav.Item>Welcome {user.username}</Nav.Item>
              <Nav.Item>
                <Link to="/add-task" className="text-white bg-primary px-4 py-1 rounded text-decoration-none">
                  Add Task
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  to="/"
                  className="text-white bg-primary px-4 py-1 rounded text-decoration-none"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </Link>
              </Nav.Item>
            </>
          ) : (
            <>
              <Nav.Item>
                <Link to="/login" className="text-white bg-primary px-4 py-1 rounded text-decoration-none">
                  Login
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/register" className="text-white bg-primary px-4 py-1 rounded text-decoration-none">
                  Register
                </Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
