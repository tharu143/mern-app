const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const loginRoutes = require("./routes/loginRoutes");
const studentRoutes = require("./routes/studentRoutes");
const tutorRoutes = require("./routes/tutorRoutes");

// Use Routes
app.use("/api/login", loginRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/tutor", tutorRoutes);

// MongoDB Connection
const MONGO_URI = "mongodb://localhost:27017/mern-app"; // Replace with your MongoDB URI
const PORT = 5000;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.error("Database connection failed:", err));
