require("dotenv").config();
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Course = require("./models/Course");
// const courses = require("./data/courses");

const app = express();

const PORT = 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("AdiGuru-AI Backend is running");
});

app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find();

    res.json(courses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch courses",
    });
  }
});

app.get("/api/courses/:id", async (req, res) => {
  try {
    const course = await Course.findOne({ id: Number(req.params.id) });

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch course",
    });
  }
});

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