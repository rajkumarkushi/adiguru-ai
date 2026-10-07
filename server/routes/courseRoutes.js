const express = require("express");
const Course = require("../models/Course");

const router = express.Router();

// GET all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();

    res.json(courses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch courses",
    });
  }
});

// GET one course
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findOne({
      id: Number(req.params.id),
    });

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

// CREATE course
router.post("/", async (req, res) => {
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

module.exports = router;