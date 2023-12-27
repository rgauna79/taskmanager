import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);
  //console.log(user);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });
  return (
    <div className="d-flex align-items-center justify-content-center  pb-4 flex-grow-1">
      <div className="bg-secondary p-4 rounded">
        {/* <h1 className="fs-1 fw-bold">Register</h1> */}
        {registerErrors.map((error, i) => (
          <div className="bg-danger text-white p-2  mb-2" key={i}>
            {error}
          </div>
        ))}
        <h1 className="fs-1 fw-bold">Register</h1>
        <form onSubmit={onSubmit} style={{ width: "400px" }}>
          <input
            type="text"
            className="form-control mb-2 p-2"
            placeholder="Username"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <p className="text-danger ">Username is required</p>
          )}
          <input
            type="text"
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
            Register
          </button>
        </form>
        <p className="d-flex justify-content-between">
          Already have an account?
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
