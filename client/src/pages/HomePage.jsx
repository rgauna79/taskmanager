import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function HomePage() {
  const { isAuthenticated } = useAuth();

  // Redirect to /tasks if the user is authenticated
  if (isAuthenticated) {
    return <Navigate to="/tasks" />;
  }

  return (
    <section className="d-flex justify-content-center align-items-center ">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-10 col-md-8 offset-md-2">
            <div className="card text-center">
              <div className="card-body bg-secondary">
                <h1 className="card-title display-4 mb-4">
                  Welcome to React Tasks
                </h1>
                <p className="card-text">
                  Organize your tasks efficiently with React Tasks.
                </p>
                {/* Link to start using the app without logging in */}
                <Link to="/tasks" className="btn btn-primary btn-lg mt-4">
                  Start without logging in
                </Link>
                <p className="d-flex justify-content-center align-items-center mt-4">
                  Already have an account?
                  <Link to="/login" className="text-primary ms-2">
                    Login
                  </Link>
                </p>
                <p className="d-flex justify-content-center align-items-center mt-2">
                  Don't have an account?
                  <Link to="/register" className="text-primary ms-2">
                    Register
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
