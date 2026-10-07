import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function LessonPage() {
  const { courseId, lessonId } = useParams();

const [course, setCourse] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [selectedAnswer, setSelectedAnswer] = useState("");
const [quizSubmitted, setQuizSubmitted] = useState(false);
const [completed, setCompleted] = useState(false);

  useEffect(() => {
    async function getCourse() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/courses/${courseId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch course");
        }

        const data = await response.json();

        setCourse(data);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getCourse();
  }, [courseId]);

 useEffect(() => {
  setSelectedAnswer("");
  setQuizSubmitted(false);

  const savedProgress = localStorage.getItem("completedLessons");

  const progress = savedProgress
    ? JSON.parse(savedProgress)
    : {};

  const isCompleted =
    progress[courseId]?.includes(Number(lessonId));

  setCompleted(Boolean(isCompleted));
}, [courseId, lessonId]);

  if (loading) {
    return <p>Loading lesson...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const lesson = course.lessons.find(
    (lesson) => lesson.id === Number(lessonId)
  );

  const currentLessonIndex = course.lessons.findIndex(
  (lesson) => lesson.id === Number(lessonId)
);

const previousLesson = course.lessons[currentLessonIndex - 1];
const nextLesson = course.lessons[currentLessonIndex + 1];

  if (!lesson) {
    return <p>Lesson not found</p>;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">

        <p className="text-sm font-semibold text-blue-600">
          Lesson {lesson.id}
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          {lesson.title}
        </h1>

        <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
          <p className="whitespace-pre-line leading-8 text-slate-700">
            {lesson.content}
          </p>
        </div>

        {lesson.quiz && (
  <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
    <h2 className="text-2xl font-bold text-slate-900">
      Quiz
    </h2>

    <p className="mt-4 text-lg font-semibold text-slate-800">
      {lesson.quiz.question}
    </p>

    <div className="mt-6 space-y-3">
      {lesson.quiz.options.map((option, index) => (
        <label
          key={index}
          className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-4 hover:bg-slate-50"
        >
          <input
            type="radio"
            name="lesson-quiz"
            value={option}
            checked={selectedAnswer === option}
            onChange={(event) => {
              setSelectedAnswer(event.target.value);
              setQuizSubmitted(false);
            }}
          />

          <span>{option}</span>
        </label>
      ))}
    </div>

    <button
      disabled={!selectedAnswer}
      onClick={() => setQuizSubmitted(true)}
      className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
    >
      Submit Answer
    </button>

    {quizSubmitted && (
      <div className="mt-6 rounded-lg bg-slate-50 p-5">
        {selectedAnswer === lesson.quiz.answer ? (
          <p className="font-semibold text-green-600">
            Correct! 🎉
          </p>
        ) : (
          <>
            <p className="font-semibold text-red-600">
              Not quite.
            </p>

            <p className="mt-2 text-slate-700">
              Correct answer:{" "}
              <span className="font-semibold">
                {lesson.quiz.answer}
              </span>
            </p>
          </>
        )}

        {lesson.quiz.explanation && (
          <p className="mt-3 text-slate-600">
            {lesson.quiz.explanation}
          </p>
        )}
      </div>
    )}
  </div>
)}

<div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
 <button
  onClick={() => {
  const savedProgress = localStorage.getItem("completedLessons");

  const progress = savedProgress
    ? JSON.parse(savedProgress)
    : {};

  const courseProgress = progress[courseId] || [];

  if (!courseProgress.includes(Number(lessonId))) {
    progress[courseId] = [
      ...courseProgress,
      Number(lessonId),
    ];

    localStorage.setItem(
      "completedLessons",
      JSON.stringify(progress)
    );
  }

  setCompleted(true);
}}
  disabled={completed}
    className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-green-300"
  >
    {completed ? "Lesson Completed ✓" : "Mark as Complete"}
  </button>
</div>

       <div className="mt-8 flex items-center justify-between">
  {previousLesson ? (
    <Link
      to={`/courses/${courseId}/lessons/${previousLesson.id}`}
      className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-100"
    >
      ← Previous Lesson
    </Link>
  ) : (
    <div />
  )}

  <Link
    to={`/courses/${courseId}`}
    className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-100"
  >
    Course
  </Link>

  {nextLesson ? (
    <Link
      to={`/courses/${courseId}/lessons/${nextLesson.id}`}
      className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
    >
      Next Lesson →
    </Link>
  ) : (
    <div />
  )}
</div>

      </div>
    </main>
  );
}

export default LessonPage;