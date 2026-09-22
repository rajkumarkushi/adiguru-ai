function CourseCard({ title, description, level, onStart }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Level: {level}</p>

     <button onClick={onStart}>
  Start Learning
</button>
    </div>
  );
}

export default CourseCard