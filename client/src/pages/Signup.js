import { useState } from "react";
import API from "../utils/api";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/signup", form);
    console.log("Success:", res.data);
    alert("Signup successful. Check email.");
  } catch (err) {
    console.log("Error:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Signup failed");
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
      <button>Signup</button>
    </form>
  );
}