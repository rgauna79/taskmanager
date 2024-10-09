import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Navbar } from "react-bootstrap";
import { useTheme } from "../../hooks/useTheme";
import { FaSun, FaMoon, FaSignOutAlt, FaUser, FaSignInAlt, FaTasks } from "react-icons/fa";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { toast } from "react-toastify";

function CustomNavbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const { toggleTheme, isDarkMode } = useTheme();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  return (
    <Navbar bg="secondary" className="my-1 rounded p-3 mx-2 justify-content-between">
      <Navbar.Brand>
        <Link to={isAuthenticated ? "/tasks" : "/"} className="text-white text-decoration-none">
          <h1 className="fs-1 fw-bold">Task Manager</h1>
        </Link>
      </Navbar.Brand>
      <div className="d-flex align-items-center" >
        <button
          onClick={toggleTheme}
          className="btn btn-secondary me-3"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>

        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="tooltip-my-tasks">My Tasks</Tooltip>}
        >
          <Link to="/tasks" className="nav-icon text-white me-3">
            <FaTasks size={24} />
          </Link>
        </OverlayTrigger>

        {isAuthenticated ? (
          <>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-logout">Logout</Tooltip>}
            >
              <button onClick={handleLogout} className="nav-icon text-white bg-transparent border-0 me-2" aria-label="Logout">
                <FaSignOutAlt size={24} />
              </button>
            </OverlayTrigger>
            <span className="text-white me-2">Welcome, {user.username}</span>
          </>
        ) : (
          <>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-login">Login</Tooltip>}
            >
              <Link to="/login" className="nav-icon text-white me-3">
                <FaSignInAlt size={24} />
              </Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-register">Register</Tooltip>}
            >
              <Link to="/register" className="nav-icon text-white me-3">
                <FaUser size={24} />
              </Link>
            </OverlayTrigger>
          </>
        )}
      </div>
    </Navbar>
  );
}

export default CustomNavbar;
