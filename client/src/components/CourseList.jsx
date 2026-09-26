import { useNavigate } from "react-router-dom";
import CourseCard from "./CourseCard";

function CourseList({ courses }) {
  const navigate = useNavigate();

  function handleStartCourse(course) {
    navigate(`/courses/${course.id}`);
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          {...course}
          onStart={() => handleStartCourse(course)}
        />
      ))}
    </div>
  );
}

export default CourseList;