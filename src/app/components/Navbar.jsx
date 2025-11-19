import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  // Logged-in user
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!localStorage.getItem("token");

  const baseLink =
    "relative text-gray-700 hover:text-blue-600 transition font-medium";
  const activeLink =
    "text-blue-700 font-semibold after:opacity-100";

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  }

  function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?author=${encodeURIComponent(query)}`);
    setQuery("");
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur-xl shadow-sm">
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 select-none">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 text-white font-bold shadow-sm">
            B
          </span>
          <span className="text-xl font-bold tracking-tight">Bloggy</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-8 text-sm">

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : ""} after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-blue-600 after:rounded-full after:transition-all after:duration-300 after:opacity-0`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/my-blogs"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : ""}`
            }
          >
            My Blogs
          </NavLink>

          <NavLink
            to="/create-blog"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : ""} after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-blue-600 after:rounded-full after:transition-all after:duration-300 after:opacity-0`
            }
          >
            Create
          </NavLink>

          {/* ⭐ Search Box */}
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search users..."
              className="px-3 py-1.5 rounded-lg border bg-white shadow-sm w-40 focus:w-52 transition-all focus:ring-2 focus:ring-blue-400 outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>

          {/* Auth Section */}
          {isLoggedIn ? (
            <div className="flex items-center gap-4">

              {/* Avatar */}
              <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold shadow-sm">
                {user?.username?.[0]?.toUpperCase() || "U"}
              </div>

              <button
                onClick={logout}
                className="px-3 py-1.5 rounded-md bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <NavLink
                to="/login"
                className="px-4 py-1.5 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className="px-4 py-1.5 rounded-md bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
              >
                Signup
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden flex items-center p-2 rounded-md hover:bg-gray-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="h-6 w-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-3 bg-white/90 backdrop-blur-md border-b">

          {/* Search Box Mobile */}
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search users..."
              className="px-3 py-2 rounded-lg border w-full bg-white shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>

          <NavLink to="/" end className={baseLink} onClick={() => setIsOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/my-blogs" className={baseLink} onClick={() => setIsOpen(false)}>
            My Blogs
          </NavLink>

          <NavLink to="/create-blog" className={baseLink} onClick={() => setIsOpen(false)}>
            Create
          </NavLink>

          {isLoggedIn ? (
            <button
              onClick={logout}
              className="block w-full text-left px-3 py-1.5 rounded-md bg-red-500 text-white font-medium hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <div className="space-y-2">
              <NavLink
                to="/login"
                className="block px-3 py-1.5 rounded-md bg-blue-600 text-white font-medium"
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className="block px-3 py-1.5 rounded-md bg-gray-200 text-gray-800 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Signup
              </NavLink>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
