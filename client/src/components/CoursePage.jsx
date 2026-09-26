import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseDetails from "./CourseDetails";

function CoursePage() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);

  useEffect(() => {
    async function getCourse() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/courses/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch course");
        }

        const data = await response.json();

        setCourse(data);
      } catch (error) {
        console.log(error);
      }
    }

    getCourse();
  }, [id]);

  return <CourseDetails course={course} />;
}

export default CoursePage;