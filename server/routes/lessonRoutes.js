const express = require("express");
const Course = require("../models/Course");

const router = express.Router();

// ADD LESSON
router.post("/:id/lessons", async (req, res) => {
  try {
    console.log("REQUEST BODY:", req.body);

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
      lessonIds.length > 0
        ? Math.max(...lessonIds) + 1
        : 1;

    const newLesson = {
      id: newLessonId,
      title: req.body.title,
      content: req.body.content,
      quiz: req.body.quiz,
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

// UPDATE LESSON
router.put("/:courseId/lessons/:lessonId", async (req, res) => {
  try {
    const course = await Course.findOne({
      id: Number(req.params.courseId),
    });

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    const lessonId = Number(req.params.lessonId);

    const lesson = course.lessons.find(
      (lesson) => lesson.id === lessonId
    );

    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found",
      });
    }

    lesson.title = req.body.title;
    lesson.content = req.body.content;
    lesson.quiz = req.body.quiz;

    await course.save();

    res.json({
      message: "Lesson updated successfully",
      course,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to update lesson",
    });
  }
});

// DELETE LESSON
router.delete("/:courseId/lessons/:lessonId", async (req, res) => {
  try {
    console.log("DELETE REQUEST");
    console.log("Course ID:", req.params.courseId);
    console.log("Lesson ID:", req.params.lessonId);

    const course = await Course.findOne({
      id: Number(req.params.courseId),
    });

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    const lessonId = Number(req.params.lessonId);

    const lessonExists = course.lessons.some(
      (lesson) => lesson.id === lessonId
    );

    if (!lessonExists) {
      return res.status(404).json({
        message: "Lesson not found",
      });
    }

    course.lessons = course.lessons.filter(
      (lesson) => lesson.id !== lessonId
    );

    await course.save();

    res.json({
      message: "Lesson deleted successfully",
      course,
    });
  } catch (error) {
    console.log("DELETE ERROR:", error);

    res.status(500).json({
      message: "Failed to delete lesson",
    });
  }
});
module.exports = router;