import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

export default function Layout() {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-gray-100 to-gray-50 text-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="animate-fadeIn rounded-2xl bg-white shadow-sm border border-gray-200 p-6 sm:p-10">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-10 border-t bg-white/70 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} <b>Bloggy</b>. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
