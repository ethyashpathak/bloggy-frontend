import { useState } from "react";
import { BASE_URL } from "./config";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    setMessage("Creating account...");

    try {
      const res = await fetch(`${BASE_URL}/api/auth/local/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || "Signup failed");
      }

      localStorage.setItem("token", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("🎉 Account created! Redirecting...");
      setTimeout(() => (window.location.href = "/"), 800);

    } catch (err) {
      setMessage("❌ " + err.message);
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 animate-fadeIn
      bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

      <div className="w-full max-w-md 
        bg-white/80 dark:bg-gray-800/70 
        backdrop-blur-xl shadow-xl 
        rounded-2xl border 
        border-gray-200 dark:border-gray-700 
        p-8 transition">

        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-2">
          Create Account
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          Join our blogging community ✨
        </p>

        <form onSubmit={handleSignup} className="space-y-5">

          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-gray-100
                border-gray-300 dark:border-gray-600 
                focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Enter a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 rounded-lg border
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-gray-100
                border-gray-300 dark:border-gray-600 
                focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

         
          <button
            className="w-full py-3 rounded-lg bg-blue-600 text-white 
              text-lg font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Sign Up 🚀
          </button>

          
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

          
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Login
            </a>
          </p>

        </form>
      </div>
    </div>
  );
}
