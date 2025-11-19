import { useEffect, useState } from "react";
import BlogCard from "./BlogCard.jsx";
import { endpoints } from "../config.js";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(endpoints.listBlogs())
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!isMounted) return;
        setBlogs(Array.isArray(json?.data) ? json.data : []);
        setError(null);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || "Something went wrong");
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  
  if (loading) {
    return (
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 shadow-sm"
          >
            <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/30 p-4 text-red-700 dark:text-red-400 mt-6">
        {error}
      </div>
    );
  }

  
  if (!blogs.length) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400">
        <p className="text-lg">No blogs found.</p>
        <p className="text-sm mt-1">Try creating your first blog!</p>
      </div>
    );
  }

  return (
  <section className="mt-10">
      
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Latest Blogs
      </h2>

     
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((b) => (
          <BlogCard key={b.documentId} blog={b} />
        ))}
      </div>
    </section>
  );
}
