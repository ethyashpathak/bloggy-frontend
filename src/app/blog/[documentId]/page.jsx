import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BASE_URL, endpoints } from "../../config.js";

function getImageUrl(coverImage) {
  const url = coverImage?.url;
  if (!url) return null;
  return url.startsWith("http") ? url : `${BASE_URL}${url}`;
}

export default function BlogPage() {
  const { documentId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(endpoints.singleBlog(documentId))
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to fetch blog: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!isMounted) return;
        setBlog(json?.data ?? null);
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
  }, [documentId]);

  // ⭐ Loading skeleton
  if (loading) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="h-64 w-full animate-pulse rounded-xl bg-gray-200" />
        <div className="h-8 w-2/3 animate-pulse rounded bg-gray-200" />
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-4 w-full animate-pulse rounded bg-gray-100"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
        {error}
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-gray-600">
        Blog not found.{" "}
        <Link to="/" className="text-blue-600 underline">
          Go back
        </Link>
      </div>
    );
  }

  // ⭐ STRAPI V5 fields (no attributes)
  const {
    author,
    title = "Untitled",
    content = "",
    uploadedDate,
    coverImage,
  } = blog;

  const coverUrl = getImageUrl(coverImage);

  return (
    <article className="mx-auto max-w-3xl animate-fadeIn">
      {/* 🔥 Hero Image */}
      {coverUrl && (
        <div className="overflow-hidden rounded-2xl shadow-md mb-8">
          <img
            src={coverUrl}
            alt={title}
            className="w-full h-[320px] object-cover transition duration-500 hover:scale-105"
          />
        </div>
      )}

      {/* 🔥 Title */}
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
        {title}
      </h1>

      {/* 🔥 Author + Date */}
      <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">
        {author && (
          <span className="font-medium text-gray-700">✍️ {author}</span>
        )}

        {uploadedDate && (
          <>
            <span className="w-1 h-1 rounded-full bg-gray-400"></span>
            <span>{new Date(uploadedDate).toLocaleDateString()}</span>
          </>
        )}
      </div>

      {/* 🔥 Content */}
      <div className="prose prose-lg mt-8 max-w-none prose-headings:scroll-mt-20 prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-img:rounded-xl prose-img:shadow-md">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>

      {/* 🔥 Back link */}
      <div className="mt-10">
        <Link
          to="/blogs"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Blogs
        </Link>
      </div>
    </article>
  );
}
