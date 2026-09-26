const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    question: String,
    options: [String],
    answer: String,
    explanation: String,
  },
  { _id: false }
);

const lessonSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    content: String,
    quiz: quizSchema,
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  level: String,
  lessons: [lessonSchema],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;