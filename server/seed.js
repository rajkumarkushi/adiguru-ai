const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const mongoose = require("mongoose");
const Course = require("./models/Course");
const courses = require("./data/courses");

async function seedCourses() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Course.deleteMany();

    await Course.insertMany(courses);

    console.log("Courses inserted successfully");

    await mongoose.disconnect();
  } catch (error) {
    console.log("Seeding failed:", error);
  }
}

seedCourses();