
import { useEffect, useState } from "react";

function CourseDetails({ course }) {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
const [quizResult, setQuizResult] = useState("");

  const [completedLessons, setCompletedLessons] = useState(() => {
    const savedProgress = localStorage.getItem("completedLessons");

    return savedProgress ? JSON.parse(savedProgress) : {};
  });

  useEffect(() => {
    localStorage.setItem(
      "completedLessons",
      JSON.stringify(completedLessons)
    );
  }, [completedLessons]);

  useEffect(() => {
  if (course) {
    setSelectedLesson(course.lessons[0]);
  } else {
    setSelectedLesson(null);
  }
}, [course]);

useEffect(() => {
  setSelectedAnswer("");
  setQuizResult("");
}, [selectedLesson]);

  if (!course) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
        <p className="text-gray-500">
          Select a course to start learning.
        </p>
      </div>
    );
  }

  const completedCount =
    completedLessons[course.id]?.length || 0;

  const totalLessons = course.lessons.length;

  const progressPercentage =
    (completedCount / totalLessons) * 100;

    const isCourseCompleted =
  completedCount === totalLessons;

  // Find the position of the selected lesson
  const selectedLessonIndex = selectedLesson
    ? course.lessons.findIndex(
        (lesson) => lesson.id === selectedLesson.id
      )
    : -1;

  const isFirstLesson = selectedLessonIndex === 0;

  const isLastLesson =
    selectedLessonIndex === course.lessons.length - 1;

  function handlePreviousLesson() {
    if (selectedLessonIndex > 0) {
      setSelectedLesson(
        course.lessons[selectedLessonIndex - 1]
      );
    }
  }

  function handleNextLesson() {
    if (selectedLessonIndex < course.lessons.length - 1) {
      setSelectedLesson(
        course.lessons[selectedLessonIndex + 1]
      );
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Course Header */}
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          {course.title}
        </h2>

        <p className="mt-2 text-gray-600">
          {course.description}
        </p>

        <span className="mt-4 inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
          {course.level}
        </span>
      </div>

      {/* Progress */}
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">
            Course Progress
          </h3>

          <span className="text-sm font-medium text-gray-600">
            {completedCount} / {totalLessons}
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {isCourseCompleted ? (
  <div className="mt-4 rounded-lg bg-green-50 px-4 py-3 font-medium text-green-700">
    🎉 Course Completed!
  </div>
) : (
  <p className="mt-2 text-sm text-gray-500">
    {Math.round(progressPercentage)}% completed
  </p>
)}
      </div>

      {/* Lessons */}
      <div className="mt-8">
        <h3 className="mb-4 text-xl font-bold text-gray-900">
          Lessons
        </h3>

        <div className="space-y-3">
          {course.lessons.map((lesson) => {
            const isCompleted =
              completedLessons[course.id]?.includes(lesson.id);

            const isSelected =
              selectedLesson?.id === lesson.id;

            return (
              <div
                key={lesson.id}
                onClick={() => setSelectedLesson(lesson)}
                className={`cursor-pointer rounded-lg border p-4 transition ${
                  isSelected
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium text-gray-800">
                    {lesson.id}. {lesson.title}
                  </span>

                  {isCompleted && (
                    <span className="whitespace-nowrap text-sm font-medium text-green-600">
                      ✓ Completed
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Lesson */}
      {selectedLesson && (
        <div className="mt-8 rounded-xl bg-slate-50 p-6">

          <h3 className="text-2xl font-bold text-gray-900">
            {selectedLesson.title}
          </h3>

          <p className="mt-3 leading-7 text-gray-600">
            {selectedLesson.content}
          </p>

          {/* Completion */}
          <div className="mt-6">
        
{completedLessons[course.id]?.includes(
  selectedLesson.id
) ? (
  <div className="rounded-lg bg-green-50 px-4 py-3 font-medium text-green-700">
    ✓ Lesson Completed
  </div>
) : selectedLesson.quiz && quizResult !== "correct" ? (
  <div className="rounded-lg bg-yellow-50 px-4 py-3 text-sm text-yellow-700">
    Complete the quiz correctly before marking this lesson as complete.
  </div>
) : (
  <button
    className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
    onClick={() => {
      setCompletedLessons({
        ...completedLessons,
        [course.id]: [
          ...(completedLessons[course.id] || []),
          selectedLesson.id,
        ],
      });
    }}
  >
    Mark as Complete
  </button>
)}


          </div>

      
{selectedLesson.quiz && (
  <div className="mt-8 border-t border-gray-200 pt-6">
    <h4 className="text-xl font-bold text-gray-900">
      Quick Quiz
    </h4>

    <p className="mt-3 font-medium text-gray-800">
      {selectedLesson.quiz.question}
    </p>

    <div className="mt-4 space-y-3">
      {selectedLesson.quiz.options.map((option) => {
        const isSelected = selectedAnswer === option;

        return (
          <button
            key={option}
            onClick={() => {
              if (quizResult !== "correct") {
                setSelectedAnswer(option);
                setQuizResult("");
              }
            }}
            disabled={quizResult === "correct"}
            className={`block w-full rounded-lg border p-3 text-left transition ${
              isSelected
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white hover:border-blue-300"
            } ${
              quizResult === "correct"
                ? "cursor-default"
                : "cursor-pointer"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>

    {quizResult !== "correct" && (
      <button
        onClick={() => {
          if (
            selectedAnswer ===
            selectedLesson.quiz.answer
          ) {
            setQuizResult("correct");
          } else {
            setQuizResult("wrong");
          }
        }}
        disabled={!selectedAnswer}
        className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        Check Answer
      </button>
    )}

   {quizResult === "correct" && (
  <div className="mt-4 rounded-lg bg-green-50 px-4 py-4 text-green-700">
    <p className="font-semibold">
      ✅ Correct! Well done.
    </p>

    <p className="mt-2 text-sm">
      {selectedLesson.quiz.explanation}
    </p>
  </div>
)}

    {quizResult === "wrong" && (
      <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 font-medium text-red-700">
        ❌ Not quite. Try another answer.
      </div>
    )}
  </div>
)}



          {/* Lesson Navigation */}
          <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">

            <button
              onClick={handlePreviousLesson}
              disabled={isFirstLesson}
              className={`rounded-lg px-4 py-2.5 font-medium transition ${
                isFirstLesson
                  ? "cursor-not-allowed bg-gray-100 text-gray-400"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              ← Previous
            </button>

            <span className="text-sm text-gray-500">
              Lesson {selectedLessonIndex + 1} of {totalLessons}
            </span>

            <button
              onClick={handleNextLesson}
              disabled={isLastLesson}
              className={`rounded-lg px-4 py-2.5 font-medium transition ${
                isLastLesson
                  ? "cursor-not-allowed bg-gray-100 text-gray-400"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next Lesson →
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default CourseDetails;

