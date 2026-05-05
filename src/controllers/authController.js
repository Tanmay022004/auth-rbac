const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");

const sendEmail = require("../utils/sendEmail");

//
// SIGNUP
//
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
      isVerified: false,
      verificationToken,
      verificationTokenExpire: Date.now() + 24 * 60 * 60 * 1000
    });
    
    await user.save();
    const verifyUrl = `${process.env.CLIENT_URL}/verify/${verificationToken}`;

    try {
      await sendEmail(email, "Verify your email", verifyUrl);
    } catch (err) {
      console.log("EMAIL FAILED:", err.message);
    }

    return res.status(201).json({
      message: "Signup successful. Please verify your email."
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

//
// LOGIN
//
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Account not verified"
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

//
// REFRESH TOKEN (🔥 THIS WAS MISSING — THIS WAS YOUR ERROR)
//
exports.refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "No refresh token" });
    }

    const jwt = require("jsonwebtoken");

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken(user);

    return res.json({ accessToken: newAccessToken });

  } catch (err) {
    return res.status(403).json({ message: "Refresh expired" });
  }
};

//
// VERIFY EMAIL
//
exports.verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    console.log("USER BEFORE UPDATE:", user.isVerified);

    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          isVerified: true,
          verificationToken: undefined,
          verificationTokenExpire: undefined
        }
      }
    );

    const updatedUser = await User.findById(user._id);
    console.log("USER AFTER UPDATE:", updatedUser.isVerified);

    return res.json({ message: "Email verified successfully" });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

//
// FORGOT PASSWORD
//
exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail(user.email, "Password Reset", resetUrl);

    return res.json({ message: "Reset link sent" });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

//
// RESET PASSWORD
//
exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    return res.json({ message: "Password reset successful" });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};