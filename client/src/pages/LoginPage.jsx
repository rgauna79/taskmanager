import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="d-flex align-items-center justify-content-center pb-4 flex-grow-1">
      <div
        className="bg-secondary max-width-md p-4 rounded"
        style={{ width: "400px" }}
      >
        {signinErrors.map((error, i) => (
          <div className="bg-danger text-white p-2  mb-2" key={i}>
            {error}
          </div>
        ))}
        <h1 className="fs-1 fw-bold">Login</h1>

        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="form-control mb-2 p-2"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="text-danger">Email is required</p>}

          <input
            type="password"
            className="form-control mb-2 p-2"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-danger">Password is required</p>
          )}

          <button className="btn btn-primary m-2" type="submit">
            Login
          </button>
        </form>
        <p className="d-flex justify-content-between">
          Don't have an account?
          <Link to="/register" className="text-primary fw-bold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
