import { useEffect, useState } from "react";
import { BASE_URL } from "../config.js";
import BlogCard from "./BlogCard.jsx";

export default function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return (
      <div className="mt-10 text-center text-red-600 font-medium">
        You must be logged in to view your blogs.
        <br />
        <a href="/login" className="text-blue-600 underline">
          Go to Login
        </a>
      </div>
    );
  }

  useEffect(() => {
    let isMounted = true;
    const username = user.username;

    const url = `${BASE_URL}/api/blogs?filters[author][$eq]=${username}&populate=*`;

    fetch(url)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch your blogs");
        return res.json();
      })
      .then((json) => {
        if (!isMounted) return;
        setBlogs(json.data || []);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => (isMounted = false);
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-1/3 bg-gray-200 animate-pulse rounded" />
        <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 border border-red-200 text-red-600">
        {error}
      </div>
    );
  }

  if (!blogs.length) {
    return (
      <p className="text-gray-500 text-center mt-10">
        You haven't created any blogs yet.
        <br />
        <a href="/create-blog" className="text-blue-600 underline">
          Create your first blog →
        </a>
      </p>
    );
  }

  return (
    <section className="animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6">📚 My Blogs</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard key={blog.documentId} blog={blog} />
        ))}
      </div>
    </section>
  );
}
