import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const baseLink = 'text-gray-700 hover:text-blue-600 transition-colors'
  const activeLink = 'text-blue-700 font-semibold'

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white font-bold">B</span>
          <span className="text-lg font-semibold tracking-tight">Bloggy</span>
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''}`}
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/blogs"
            className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''}`}
          >
            Blogs
          </NavLink>
          <NavLink
            to="/create-blog"
            className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ''}`}
          >
            Create
          </NavLink>
          

        </div>
      </nav>
    </header>
  )
}
