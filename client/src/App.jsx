import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import Home from "./pages/Home";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div>
        <Loader className="size-5 animate-spin" />
      </div>
    );
  }
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        {/* <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <LoginPage />}
        />

        <Route
          path="/register"
          element={authUser ? <Navigate to="/" /> : <SignUpPage />}
        /> */}

      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
