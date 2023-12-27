import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-secondary my-1 mb-3 d-flex justify-content-between py-2 px-3 rounded " style={{minWidth:"500px"}}>
      <Link
        to={isAuthenticated ? "/tasks" : "/"}
        className="custom-link text-white"
      >
        <h1 className="fs-1 fw-bold">Task manager</h1>
      </Link>
      <ul className="d-flex gap-2 align-items-center m-1">
        {isAuthenticated ? (
          <>
            <li>Welcome {user.username}</li>
            <li>
              <Link
                to="/add-task"
                className="custom-link text-white bg-primary px-4 py-1 rounded"
              >
                Add Task
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="custom-link text-white bg-primary px-4 py-1 rounded"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                className="custom-link text-white bg-primary px-4 py-1 rounded"
                to="/login"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                className="custom-link text-white bg-primary px-4 py-1 rounded"
                to="/register"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
