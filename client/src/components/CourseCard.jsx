function CourseCard({ title, description, level, onStart }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <h3 className="text-xl font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 text-gray-600">
        {description}
      </p>

      <span className="mt-4 inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
        {level}
      </span>

      <button
        className="mt-5 block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        onClick={onStart}
      >
        Start Learning
      </button>
    </div>
  );
}

export default CourseCard;