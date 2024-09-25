import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import TasksPage from "./pages/TasksPage";
import { TaskFormPage } from "./pages/TaskFormPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoutes from "./routes";
import { TaskProvider } from "./context/TasksContext";
import Navbar from "./components/ui/Navbar";
import "./App.css";

function App() {
  const { loading } = useAuth();
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <div
            className="d-flex flex-column min-vh-100"
            style={{ minWidth: "320px" }}
          >
            <Navbar />

            <main className="d-flex flex-column flex-grow-1 justify-content-center align-items-center container-fluid px-2">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route element={<ProtectedRoutes />}>
                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/add-task" element={<TaskFormPage />} />
                  <Route path="/tasks/:id" element={<TaskFormPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
