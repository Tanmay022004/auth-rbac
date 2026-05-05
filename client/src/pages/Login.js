import { useState } from "react";
import API from "../utils/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);

      // save token safely
      localStorage.setItem("token", res.data.accessToken);

      alert("Login successful");

      console.log("LOGIN RESPONSE:", res.data);

    } catch (err) {
      console.log("LOGIN ERROR:", err);

      if (!err.response) {
        alert("Server not reachable (backend is down or CORS issue)");
        setLoading(false);
        return;
      }

      const { status, data } = err.response;

      if (status === 403) {
        alert(data.message || "Account not verified");
      } 
      else if (status === 401) {
        alert("Invalid email or password");
      } 
      else if (status === 404) {
        alert("Login route not found (backend issue)");
      } 
      else {
        alert(data.message || "Something went wrong");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      <button disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}