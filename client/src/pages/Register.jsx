import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthLayout from "../components/AuthLayout";
import { Link } from "react-router";
import { Loader2 } from "lucide-react";

export default function Register() {
  const { signUp, isSigningUp } = useAuthStore();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(form);
  };

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="input input-bordered w-full"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />

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

        <button className="btn btn-primary w-full" disabled={isSigningUp}>
          {isSigningUp ? <Loader2 className="animate-spin" /> : "Register"}
        </button>

        <p className="text-sm text-center">
          มีบัญชีแล้ว?{" "}
          <Link to="/login" className="link link-primary">
            เข้าสู่ระบบ
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
