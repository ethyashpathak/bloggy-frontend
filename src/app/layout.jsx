import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'

export default function Layout() {
  return (
    <div className="min-h-dvh bg-gray-50 text-gray-900">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} Bloggy. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
