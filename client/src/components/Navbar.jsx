
function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <h2 className="text-2xl font-bold text-blue-600">
          AdiGuru-AI
        </h2>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <a
            href="/"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            Home
          </a>

          <a
            href="/courses"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            Courses
          </a>

          <a
            href="/login"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Login
          </a>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;

