# Full-Stack Authentication & Authorization System

A production-ready full-stack authentication and authorization system built using the MERN stack. The project includes JWT authentication, refresh tokens, email verification, password reset functionality, protected routes, and role-based access control (RBAC).

---

# 🚀 Live Demo

Frontend: https://auth-rbac-frontend.vercel.app

---

# 📂 GitHub Repository

Repository: https://github.com/Tanmay022004/auth-rbac

---

# ✨ Features

- User Signup & Login
- JWT Authentication
- Refresh Token Authentication
- Email Verification System
- Forgot Password & Reset Password
- Role-Based Access Control (RBAC)
- Protected API Routes
- Secure Password Hashing using bcrypt.js
- HTTP-only Cookie Handling
- MongoDB Atlas Integration
- Fully Deployed Frontend & Backend

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Axios
- React Router DOM

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT (JSON Web Token)
- bcrypt.js
- Nodemailer

## Deployment
- Vercel (Frontend)
- Render (Backend)

---

# 📁 Project Structure

```bash
auth-rbac/
│
├── client/                      # React Frontend
│
├── node_modules/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── authController.js
│   │
│   ├── middleware/
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── routes/
│   │   └── authRoutes.js
│   │
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── sendEmail.js
│   │
│   ├── app.js
│   └── server.js
│
├── tests/
│
├── .env
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/Tanmay022004/auth-rbac.git
```

---

## Backend Setup

Install dependencies:

```bash
npm install
```

Run backend server:

```bash
npm start
```

---

## Frontend Setup

Move to frontend directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm start
```

---

# 🔐 Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

JWT_REFRESH_SECRET=your_refresh_secret

CLIENT_URL=http://localhost:3000

EMAIL_USER=your_email

EMAIL_PASS=your_email_password
```

---

# 📡 API Routes

## Authentication Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/auth/signup | Register User |
| POST | /api/auth/login | Login User |
| GET | /api/auth/verify/:token | Verify Email |
| POST | /api/auth/refresh | Refresh Access Token |
| POST | /api/auth/forgot-password | Forgot Password |
| POST | /api/auth/reset-password/:token | Reset Password |

---

# 🔒 Security Features

- Password hashing using bcrypt.js
- JWT access token authentication
- Refresh token handling
- Protected backend routes
- Role-based authorization
- Secure email verification workflow
- HTTP-only cookie support

---

# 🌍 Deployment

## Frontend Deployment
- Vercel

## Backend Deployment
- Render

## Database
- MongoDB Atlas

---

# 🚀 Future Improvements

- Google OAuth Authentication
- GitHub OAuth Authentication
- Two-Factor Authentication (2FA)
- Admin Dashboard UI
- User Profile Management
- Rate Limiting & API Throttling

---

# 👨‍💻 Author

Tanmay Gedam

---

# 📜 License

This project is developed for learning and portfolio purposes.