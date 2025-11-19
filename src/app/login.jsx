import { useState } from "react";
import { BASE_URL } from "./config";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      const res = await fetch(`${BASE_URL}/api/auth/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error?.message || "Invalid credentials");

      localStorage.setItem("token", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("✔ Login successful! Redirecting...");
      setTimeout(() => (window.location.href = "/"), 800);

    } catch (err) {
      setMessage("❌ " + err.message);
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 animate-fadeIn
      bg-gray-50 dark:bg-gray-900 transition-colors">

      <div className="w-full max-w-md 
        bg-white/80 dark:bg-gray-800/70 
        backdrop-blur-xl shadow-xl 
        rounded-2xl border 
        border-gray-200 dark:border-gray-700 
        p-8 transition">

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          Login to access your dashboard
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email / Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email or Username
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border 
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-gray-100
                border-gray-300 dark:border-gray-600
                focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Enter your email or username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 rounded-lg border 
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-gray-100
                border-gray-300 dark:border-gray-600
                focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            className="w-full py-3 rounded-lg 
              bg-blue-600 text-white text-lg font-semibold 
              hover:bg-blue-700 transition shadow-md"
          >
            Login
          </button>

          {/* Message */}
          {message && (
            <p
              className={`text-center text-sm mt-2 ${
                message.startsWith("❌")
                  ? "text-red-600 dark:text-red-500"
                  : "text-green-600 dark:text-green-400"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
