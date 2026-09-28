import { useState } from "react";

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("Beginner");

  async function handleSubmit(event) {
    event.preventDefault();

    const newCourse = {
      title,
      description,
      level,
      lessons: [],
    };

    try {
      const response = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      });

      if (!response.ok) {
        throw new Error("Failed to create course");
      }

      const data = await response.json();

      console.log("Course created:", data);

      alert("Course created successfully!");

      setTitle("");
      setDescription("");
      setLevel("Beginner");
    } catch (error) {
      console.log(error);
      alert("Failed to create course");
    }
  }

  return (
    <div>
      <h1>Create Course</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Course title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          type="text"
          placeholder="Course description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <select
          value={level}
          onChange={(event) => setLevel(event.target.value)}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <button type="submit">Create Course</button>
      </form>
    </div>
  );
}

export default CreateCourse;