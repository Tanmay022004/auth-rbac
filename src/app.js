const express = require("express");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const app = express();

app.use(express.json());

// ✅ CORS (put this EARLY)
app.use(cors({
  origin: "https://auth-rbac-frontend.vercel.app",
  credentials: true
}));


// Rate limiter
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, try again later",
});

app.use(cookieParser());

// Health route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Apply limiter
app.use("/api/auth/login", loginLimiter);

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

module.exports = app;