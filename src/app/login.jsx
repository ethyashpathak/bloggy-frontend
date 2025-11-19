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

      if (!res.ok) {
        throw new Error(data.error?.message || "Login failed");
      }

      // Store JWT
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Login successful!");
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  }

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>

      <input
        type="text"
        placeholder="Email or Username"
        className="w-full p-2 border rounded"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="px-4 py-2 bg-blue-600 text-white rounded">
        Login
      </button>

      {message && <p>{message}</p>}
    </form>
  );
}
