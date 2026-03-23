import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={authUser ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
