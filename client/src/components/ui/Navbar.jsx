import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Navbar, Nav } from "react-bootstrap";
import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { FaSun, FaMoon } from "react-icons/fa";

function CustomNavbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { toggleTheme, isDarkMode } = useTheme();

  const handleToggle = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  const handleLinkClick = () => {
    handleClose();
  };

  return (
    <Navbar bg="secondary" expand="lg" className=" my-1 rounded p-2 mx-2">
      <Navbar.Brand>
        <Link
          to={isAuthenticated ? "/tasks" : "/"}
          className="text-white text-decoration-none"
          onClick={handleLinkClick}
        >
          <h1 className="fs-1 fw-bold">Task manager</h1>
          <button
            onClick={toggleTheme}
            className="btn btn-secondary px-0 py-1 rounded d-flex align-items-center"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle onClick={handleToggle} aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" in={isOpen} onExited={handleClose}>
        <Nav className="ml-auto mr-3 align-items-end gap-2 py-1">
          {isAuthenticated ? (
            <>
              <Nav.Item>Welcome {user.username}</Nav.Item>
              <Nav.Item>
                <Link
                  to="/add-task"
                  className="text-white bg-primary px-4 py-1 rounded text-decoration-none"
                  onClick={handleLinkClick}
                >
                  Add Task
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  to="/"
                  className="text-white bg-primary px-4 py-1 rounded text-decoration-none"
                  onClick={() => {
                    logout();
                    handleClose();
                  }}
                >
                  Logout
                </Link>
              </Nav.Item>
            </>
          ) : (
            <>
              <Nav.Item>
                <Link
                  to="/login"
                  className="text-white bg-primary px-4 py-1 rounded text-decoration-none"
                  onClick={handleLinkClick}
                >
                  Login
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  to="/register"
                  className="text-white bg-primary px-4 py-1 rounded text-decoration-none"
                  onClick={handleLinkClick}
                >
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
