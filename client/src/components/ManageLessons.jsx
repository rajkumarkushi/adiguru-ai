import { useEffect, useState } from "react";

function ManageLessons() {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        setError("Failed to load courses");
      }
    }

    getCourses();
  }, []);

  async function handleCourseChange(event) {
    const selectedId = event.target.value;

    setCourseId(selectedId);

// Close any currently open edit form
  setEditingLesson(null);

    if (!selectedId) {
      setSelectedCourse(null);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/courses/${selectedId}`
      );

      if (!response.ok) {
  const errorData = await response.json();

  throw new Error(
    errorData.message || "Failed to delete lesson"
  );
}
      const data = await response.json();

      setSelectedCourse(data);
    } catch (error) {
  console.log(error);
  alert(error.message);
}finally {
      setLoading(false);
    }
  }

  async function handleDelete(lessonId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lesson?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/courses/${courseId}/lessons/${lessonId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete lesson");
      }

      const data = await response.json();

      setSelectedCourse(data.course);

      alert("Lesson deleted successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to delete lesson");
    }
  }

  async function handleUpdateLesson() {
  if (!editingLesson) {
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5000/api/courses/${courseId}/lessons/${editingLesson.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editingLesson.title,
          content: editingLesson.content,
          quiz: editingLesson.quiz,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        errorData.message || "Failed to update lesson"
      );
    }

    const data = await response.json();

    setSelectedCourse(data.course);
    setEditingLesson(null);

    alert("Lesson updated successfully!");
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
}


  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Manage Lessons
          </h1>

          <p className="mt-2 text-slate-600">
            Create, edit and manage lessons for your courses.
          </p>
        </div>

        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Select Course
          </label>

          <select
            value={courseId}
            onChange={handleCourseChange}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Select a course</option>

            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <p className="text-center text-slate-600">
            Loading lessons...
          </p>
        )}

        {error && (
          <p className="rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </p>
        )}

       {selectedCourse && !loading && (
    <div>

    {/* Course heading */}
    <div className="mb-5">
      <h2 className="text-2xl font-bold text-slate-900">
        {selectedCourse.title}
      </h2>

      <p className="mt-1 text-slate-500">
        {selectedCourse.lessons.length} lessons
      </p>
    </div>



    {/* LESSON LIST */}
    {selectedCourse.lessons.length === 0 ? (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <p className="text-slate-500">
          This course has no lessons yet.
        </p>
      </div>
    ) : (
      <div className="space-y-4">

       {selectedCourse.lessons.map((lesson) => (
  <div
    key={lesson.id}
    className="rounded-2xl bg-white p-6 shadow-sm"
  >
    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

      <div>
        <div className="mb-2 flex items-center gap-3">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
            Lesson {lesson.id}
          </span>

          {lesson.quiz && (
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              Quiz
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-slate-900">
          {lesson.title || "Untitled lesson"}
        </h3>

        <p className="mt-2 line-clamp-2 text-slate-600">
          {lesson.content || "No content"}
        </p>
      </div>

      <div className="flex shrink-0 gap-3">
        <button
          onClick={() => setEditingLesson(lesson)}
          className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Edit
        </button>

        <button
          onClick={() => handleDelete(lesson.id)}
          className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
        >
          Delete
        </button>
      </div>

    </div>


   {/* EDIT FORM FOR THIS LESSON */}
{editingLesson?.id === lesson.id && (
  <div className="mt-6 border-t border-slate-200 pt-6">

    <h3 className="mb-5 text-lg font-bold text-slate-900">
      Edit Lesson
    </h3>

    <div className="space-y-5">

      {/* Lesson Title */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Lesson Title
        </label>

        <input
          type="text"
          value={editingLesson.title}
          onChange={(event) =>
            setEditingLesson({
              ...editingLesson,
              title: event.target.value,
            })
          }
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>


      {/* Lesson Content */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Lesson Content
        </label>

        <textarea
          rows="6"
          value={editingLesson.content}
          onChange={(event) =>
            setEditingLesson({
              ...editingLesson,
              content: event.target.value,
            })
          }
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>


      {/* Quiz Section */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

        <label className="flex cursor-pointer items-center gap-3">

          <input
            type="checkbox"
            checked={Boolean(editingLesson.quiz)}
            onChange={(event) => {

              if (event.target.checked) {
                setEditingLesson({
                  ...editingLesson,
                  quiz: {
                    question: "",
                    options: ["", "", "", ""],
                    answer: "",
                    explanation: "",
                  },
                });
              } else {
                setEditingLesson({
                  ...editingLesson,
                  quiz: undefined,
                });
              }

            }}
            className="h-4 w-4"
          />

          <span className="font-semibold text-slate-800">
            This lesson has a quiz
          </span>

        </label>


        {/* Quiz Fields */}
        {editingLesson.quiz && (
          <div className="mt-5 space-y-5">

            {/* Question */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Quiz Question
              </label>

              <input
                type="text"
                value={editingLesson.quiz.question}
                onChange={(event) =>
                  setEditingLesson({
                    ...editingLesson,
                    quiz: {
                      ...editingLesson.quiz,
                      question: event.target.value,
                    },
                  })
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>


            {/* Options */}
            {editingLesson.quiz.options.map((option, index) => (
              <div key={index}>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Option {index + 1}
                </label>

                <input
                  type="text"
                  value={option}
                  onChange={(event) => {

                    const updatedOptions = [
                      ...editingLesson.quiz.options,
                    ];

                    updatedOptions[index] = event.target.value;

                    setEditingLesson({
                      ...editingLesson,
                      quiz: {
                        ...editingLesson.quiz,
                        options: updatedOptions,
                      },
                    });

                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>
            ))}


            {/* Correct Answer */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Correct Answer
              </label>

              <select
                value={editingLesson.quiz.answer}
                onChange={(event) =>
                  setEditingLesson({
                    ...editingLesson,
                    quiz: {
                      ...editingLesson.quiz,
                      answer: event.target.value,
                    },
                  })
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >

                <option value="">
                  Select correct answer
                </option>

                {editingLesson.quiz.options.map((option, index) => (
                  <option
                    key={index}
                    value={option}
                  >
                    {option || `Option ${index + 1}`}
                  </option>
                ))}

              </select>
            </div>


            {/* Explanation */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Explanation
              </label>

              <textarea
                rows="4"
                value={editingLesson.quiz.explanation}
                onChange={(event) =>
                  setEditingLesson({
                    ...editingLesson,
                    quiz: {
                      ...editingLesson.quiz,
                      explanation: event.target.value,
                    },
                  })
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

          </div>
        )}

      </div>


      {/* Buttons */}
      <div className="flex gap-3">

        <button
          onClick={handleUpdateLesson}
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Save Changes
        </button>

        <button
          onClick={() => setEditingLesson(null)}
          className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>

      </div>

    </div>
  </div>
)}
  </div>
))}
      </div>
    )}

  </div>
)}
      </div>
    </main>
  );
}

export default ManageLessons;