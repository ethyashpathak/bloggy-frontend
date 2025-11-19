import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BASE_URL } from "../config.js";
import BlogCard from "./BlogCard.jsx";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get ?author=__query__
  const query = searchParams.get("author") || "";

  useEffect(() => {
    if (!query) return;

    let isMounted = true;

    const url = `${BASE_URL}/api/blogs?filters[author][$containsi]=${query}&populate=*`;

    fetch(url)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch results");
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
  }, [query]);

  if (!query) {
    return (
      <div className="text-center mt-10 text-gray-600">
        No search term provided.
      </div>
    );
  }

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

  return (
    <section className="animate-fadeIn">
      <h1 className="text-3xl font-bold mb-4">
        🔍 Results for: <span className="text-blue-600">"{query}"</span>
      </h1>

      {blogs.length === 0 ? (
        <p className="text-gray-500 mt-6 text-lg">
          No blogs found from this user.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.documentId} blog={blog} />
          ))}
        </div>
      )}
    </section>
  );
}
