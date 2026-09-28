import { useState } from "react";

function CreateLesson() {
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const newLesson = {
      title,
      content,
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
    } catch (error) {
      console.log(error);
      alert("Failed to create lesson");
    }
  }

  return (
    <div>
      <h1>Create Lesson</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Course ID"
          value={courseId}
          onChange={(event) => setCourseId(event.target.value)}
        />

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

        <button type="submit">Add Lesson</button>
      </form>
    </div>
  );
}

export default CreateLesson;