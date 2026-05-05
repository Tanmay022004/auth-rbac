import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function Verify() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await API.get(`/auth/verify/${token}`);

        console.log("VERIFY SUCCESS:", res.data);

        setMessage("Email verified successfully");

        // wait before redirect (IMPORTANT)
        setTimeout(() => {
          navigate("/login");
        }, 3000);

      } catch (err) {
        console.log("VERIFY ERROR:", err);

        const msg =
          err?.response?.data?.message || "Invalid or expired token";

        setMessage(msg);

        // ❌ DO NOT auto redirect on failure
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return <h2>{message}</h2>;
}