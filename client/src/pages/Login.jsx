import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthLayout from "../components/AuthLayout";
import { Link } from "react-router";
import { Loader2 } from "lucide-react";

export default function Login() {
  const { logIn, isLoggingIn } = useAuthStore();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    logIn(form);
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="btn btn-primary w-full" disabled={isLoggingIn}>
          {isLoggingIn ? <Loader2 className="animate-spin" /> : "Login"}
        </button>

        <p className="text-sm text-center">
          ยังไม่มีบัญชี?{" "}
          <Link to="/register" className="link link-primary">
            สมัครสมาชิก
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
