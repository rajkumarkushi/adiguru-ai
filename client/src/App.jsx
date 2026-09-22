import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import CourseCard from "./components/CourseCard";
import UserList from "./components/UserList";

function App() {
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");

  const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
   const [selectedCourse, setSelectedCourse] = useState(null);

  //  useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);
  //     });
  // }, []);

  useEffect(() => {
  async function getUsers() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      setUsers(data);
      setLoading(false);
    } catch (error) {
      setError("Failed to load users");
      setLoading(false);
    }
  }

  getUsers();
}, []);

  const courses = [
    {
      title: "JavaScript",
      description: "Master JavaScript fundamentals",
      level: "Beginner",
    },
    {
      title: "React",
      description: "Build modern interfaces with React",
      level: "Intermediate",
    },
    {
      title: "Node.js",
      description: "Build REST APIs with Node.js",
      level: "Beginner",
    },
    {
      title: "MongoDB",
      description: "Store application data",
      level: "Beginner",
    },
  ];

  function handleStartCourse(addedcourse) {
    setSelectedCourse(addedcourse);
    console.log(selectedCourse);
  }

  return (
    <div>
      <Navbar />

      <h1>Welcome to AdiGuru-AI</h1>

      <h2>Total Courses: {count}</h2>

      <button onClick={() => setCount(count + 1)}>Increase</button>

      <div>
        {courses.map((course) => (
          <CourseCard
            key={course.title}
            {...course}
            onStart={() => handleStartCourse(course)}
          />
        ))}
      </div>

      {selectedCourse && (
        <div>
          <h2>You selected: {selectedCourse.title}</h2>
          <p>{selectedCourse.description}</p>
          <p>Level: {selectedCourse.level}</p>
        </div>
      )}

      {/* <div>
     {loading ? (
  <p>Loading users...</p>
) : error ? (
  <p>{error}</p>
) : (
  users.map(user => (
    <div key={user.id}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  ))
)}
      </div> */}
      <UserList users={users} />
    </div>
  );
}

export default App;
