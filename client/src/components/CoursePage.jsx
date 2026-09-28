import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CourseDetails from "./CourseDetails";

function CoursePage() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getCourse() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/courses/${id}`
        );

        if (!response.ok) {
          throw new Error("Course not found");
        }

        const data = await response.json();

        setCourse(data);
      } catch (error) {
        console.log(error);
        setError("Failed to load course");
      } finally {
        setLoading(false);
      }
    }

    getCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 text-center">
        <p className="text-lg text-gray-600">
          Loading course...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 text-center">
        <p className="text-lg text-red-600">
          {error}
        </p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <Link
        to="/"
        className="mb-6 inline-block text-blue-600 hover:underline"
      >
        ← Back to Courses
      </Link>

      <CourseDetails course={course} />
    </main>
  );
}

export default CoursePage;