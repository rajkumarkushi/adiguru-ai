
import { useEffect, useState } from "react";
import {  Routes, Route } from "react-router-dom";
import CoursePage from "./components/CoursePage";
import Navbar from "./components/Navbar";
import CourseDetails from "./components/CourseDetails";
// import courses from "./data/courses";
import CourseList from "./components/CourseList";

function App() {
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
  async function getCourses() {
    try {
      const response = await fetch(
        "http://localhost:5000/api/courses"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await response.json();

      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  }

  getCourses();
}, []);


  // function handleStartCourse(addedcourse) {
  //   setSelectedCourse(addedcourse);
  // }
// async function handleStartCourse(course) {
//   try {
//     const response = await fetch(
//       `http://localhost:5000/api/courses/${course.id}`
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch course");
//     }

//     const data = await response.json();

//     setSelectedCourse(data);
//   } catch (error) {
//     console.log(error);
//   }
// }

return (
  <div className="min-h-screen bg-slate-50">
    <Navbar />

    <Routes>

      <Route
        path="/"
        element={
          <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

            <section className="mb-10 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-blue-600 sm:text-5xl">
                AdiGuru-AI
              </h1>

              <p className="mt-3 text-lg text-gray-600">
                Learn technology with a smarter learning experience.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Explore Courses
              </h2>

              <CourseList courses={courses} />
            </section>

          </main>
        }
      />

      <Route
        path="/courses/:id"
        element={<CoursePage />}
      />

    </Routes>
  </div>
)}

export default App;

