import { useEffect, useState } from "react";

function CreateLesson() {
  const [courses, setCourses] = useState([]);

  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hasQuiz, setHasQuiz] = useState(true);

  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");
  const [explanation, setExplanation] = useState("");

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

  async function handleSubmit(event) {
  event.preventDefault();

  // Basic lesson validation
  if (!courseId) {
    alert("Please select a course");
    return;
  }

  if (!title.trim()) {
    alert("Please enter a lesson title");
    return;
  }

  if (!content.trim()) {
    alert("Please enter lesson content");
    return;
  }

  // Quiz validation ONLY if quiz is enabled
  if (hasQuiz) {
    if (!question.trim()) {
      alert("Please enter a quiz question");
      return;
    }

    if (
      !option1.trim() ||
      !option2.trim() ||
      !option3.trim() ||
      !option4.trim()
    ) {
      alert("Please enter all four options");
      return;
    }

    if (!answer.trim()) {
      alert("Please select the correct answer");
      return;
    }
  }

  // Create lesson object
  const newLesson = {
    title,
    content,

    ...(hasQuiz && {
      quiz: {
        question,
        options: [option1, option2, option3, option4],
        answer,
        explanation,
      },
    }),
  };

  try {
    const response = await fetch(
      `http://localhost:5000/api/courses/${courseId}/lessons`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLesson),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create lesson");
    }

    const data = await response.json();

    console.log("Lesson created:", data);

    alert("Lesson created successfully!");

    setTitle("");
    setContent("");
    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setAnswer("");
    setExplanation("");
  } catch (error) {
    console.log(error);
    alert("Failed to create lesson");
  }
}
  return (
    <div>
      <h1>Create Lesson</h1>

      <form onSubmit={handleSubmit}>

        <select
          value={courseId}
          onChange={(event) => setCourseId(event.target.value)}
        >
          <option value="">Select Course</option>

          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Lesson title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <textarea
          placeholder="Lesson content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />

<div>
  <label>
    <input
      type="checkbox"
      checked={hasQuiz}
      onChange={(event) => setHasQuiz(event.target.checked)}
    />
    Add quiz to this lesson
  </label>
</div>
        <h2>Quiz</h2>


{hasQuiz && (
   <div>
        <input
          type="text"
          placeholder="Quiz question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />

        <input
          type="text"
          placeholder="Option 1"
          value={option1}
          onChange={(event) => setOption1(event.target.value)}
        />

        <input
          type="text"
          placeholder="Option 2"
          value={option2}
          onChange={(event) => setOption2(event.target.value)}
        />

        <input
          type="text"
          placeholder="Option 3"
          value={option3}
          onChange={(event) => setOption3(event.target.value)}
        />

        <input
          type="text"
          placeholder="Option 4"
          value={option4}
          onChange={(event) => setOption4(event.target.value)}
        />

        <select
  value={answer}
  onChange={(event) => setAnswer(event.target.value)}
>
  <option value="">Select correct answer</option>

  <option value={option1}>{option1}</option>
  <option value={option2}>{option2}</option>
  <option value={option3}>{option3}</option>
  <option value={option4}>{option4}</option>
</select>


        <textarea
          placeholder="Quiz explanation"
          value={explanation}
          onChange={(event) => setExplanation(event.target.value)}
        />
        </div>
)}
        <button type="submit">
          Add Lesson
        </button>

      </form>
    </div>
  );
}

export default CreateLesson;