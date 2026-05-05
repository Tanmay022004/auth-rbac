require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");
const connectDB = require("./config/db");

// connect using your DB helper (this is enough)
connectDB();

// optional debug: confirm connection
mongoose.connection.once("open", () => {
  console.log("CONNECTED DB NAME:", mongoose.connection.name);
  console.log("CONNECTED HOST:", mongoose.connection.host);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});