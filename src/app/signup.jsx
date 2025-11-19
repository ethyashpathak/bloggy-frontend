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

      // Save user + token
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("🎉 Account created! Redirecting...");
      setTimeout(() => (window.location.href = "/"), 800);

    } catch (err) {
      setMessage("❌ " + err.message);
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 animate-fadeIn">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl border border-gray-200 p-8">

        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Create Account
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Join our blogging community ✨
        </p>

        <form onSubmit={handleSignup} className="space-y-5">

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Enter a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Signup button */}
          <button
            className="w-full py-3 rounded-lg bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Sign Up 🚀
          </button>

          {message && (
            <p
              className={`text-center text-sm ${
                message.startsWith("❌") ? "text-red-600" : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}

          {/* Already have account? */}
          <p className="text-center text-sm text-gray-500 mt-3">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-medium hover:underline">
              Login
            </a>
          </p>

        </form>
      </div>
    </div>
  );
}
