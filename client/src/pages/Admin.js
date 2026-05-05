import { useEffect, useState } from "react";
import API from "../utils/api";

export default function Admin() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/auth/admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(res.data);
      } catch (err) {
        if (err.response) {
          if (err.response.status === 403) {
            setError("Access denied. Admins only.");
          } else if (err.response.status === 401) {
            setError("Unauthorized. Please login again.");
          } else {
            setError("Something went wrong.");
          }
        } else {
          setError("Server not responding.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel</h1>
      <p>{data?.message}</p>

      <div style={{ marginTop: "20px" }}>
        <h3>Admin Actions</h3>
        <ul>
          <li>Manage Users</li>
          <li>View Reports</li>
          <li>System Settings</li>
        </ul>
      </div>
    </div>
  );
}