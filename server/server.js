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
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AdiGuru-AI Backend is running");
});

//getting all the courses
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


//getting individual course after clicking ons that learning button
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


//posting coursee
app.post("/api/courses", async (req, res) => {
  try {
    const lastCourse = await Course.findOne().sort({ id: -1 });

    const newId = lastCourse ? lastCourse.id + 1 : 1;

    const course = await Course.create({
      ...req.body,
      id: newId,
    });

    res.status(201).json(course);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to create course",
    });
  }
});

//adding a lesson to course
app.post("/api/courses/:id/lessons", async (req, res) => {
  try {
    const course = await Course.findOne({
      id: Number(req.params.id),
    });

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

  const lessonIds = course.lessons
  .map((lesson) => lesson.id)
  .filter((id) => Number.isFinite(id));

const newLessonId =
  lessonIds.length > 0 ? Math.max(...lessonIds) + 1 : 1;

    const newLesson = {
      id: newLessonId,
      title: req.body.title,
      content: req.body.content,
    };

    course.lessons.push(newLesson);

    await course.save();

    res.status(201).json(course);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to add lesson",
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