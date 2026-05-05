import { useEffect, useState } from "react";
import API from "../utils/api";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setMessage("No token found. Please login again.");
          return;
        }

        // decode user info from token
        const decoded = jwtDecode(token);
        setRole(decoded.role);

        // call backend
        const res = await API.get("/auth/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMessage(res.data.message);

      } catch (err) {
        console.log("Dashboard error:", err);

        if (!err.response) {
          setMessage("Server not reachable.");
        } else if (err.response.status === 401) {
          setMessage("Unauthorized. Please login again.");
        } else if (err.response.status === 403) {
          setMessage("Session expired or invalid token.");
        } else {
          setMessage("Something went wrong.");
        }
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      {role && (
        <p>
          <strong>Role:</strong> {role}
        </p>
      )}

      <p>{message}</p>

      {role === "admin" && (
        <div style={{ marginTop: "20px" }}>
          <button>Admin Panel Access</button>
        </div>
      )}
    </div>
  );
}