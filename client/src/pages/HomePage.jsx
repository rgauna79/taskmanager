import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function HomePage() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/tasks" />;
  }

  return (
    <section className="d-flex justify-content-center align-items-center flex-grow-1">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-10 col-md-8 offset-md-2">
            <div className="card text-center">
              <div className="card-body bg-secondary">
                <h1 className="card-title display-4 mb-4">
                  Welcome to React Tasks
                </h1>
                <p className="card-text">
                  Organize your tasks efficiently with React Tasks
                </p>
                <Link to="/register" className="btn btn-primary btn-lg mt-4">
                  Get Started
                </Link>
                <p className="d-flex justify-content-center align-items-center mt-4">
                  Already have an account?
                  <Link to="/login" className="text-primary ms-2">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
