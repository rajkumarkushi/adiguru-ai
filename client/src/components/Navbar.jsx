
import { Link } from "react-router-dom";

function Navbar() {
  // Check whether a user is logged in
  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  // Logout function
  function handleLogout() {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
  }

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <h2 className="text-2xl font-bold text-blue-600">
          AdiGuru-AI
        </h2>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/courses"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            Courses
          </Link>

          {loggedInUser ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">
                Welcome, {loggedInUser.name}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
