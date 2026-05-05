const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// AUTH ROUTES
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/refresh", authController.refreshToken);

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);

router.get("/verify/:token", authController.verifyEmail);


// PROTECTED ROUTES
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "User dashboard" });
});

router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({ message: "Admin only" });
  }
);

module.exports = router;