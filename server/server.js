// require("dotenv").config();
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});
console.log("Mongo URI loaded:", Boolean(process.env.MONGO_URI));

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const courseRoutes = require("./routes/courseRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

const PORT = 5000;

const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("AdiGuru-AI Backend is running");
});

app.use("/api/courses", courseRoutes);// /api/courses + / -express combines it
app.use("/api/courses", lessonRoutes);

console.log("USER ROUTES LOADED");
app.use("/api/users", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error);
  });