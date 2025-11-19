import { Link } from "react-router-dom";
import { BASE_URL } from "../../app/config.js";

function getImageUrl(coverImage) {
  const url = coverImage?.url;
  if (!url) return null;
  return url.startsWith("http") ? url : `${BASE_URL}${url}`;
}

export default function BlogCard({ blog }) {
  const {
    documentId,
    title = "Untitled",
    uploadedDate,
    content = "",
    coverImage,
    author,
  } = blog;

  const preview = content.replace(/[#>*_`]/g, "").slice(0, 150);
  const img = getImageUrl(coverImage);

  return (
  <article className="group rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 w-full overflow-hidden">
        {img && (
          <Link to={`/blog/${documentId}`}>
            <img
              src={img}
              alt={title}
              className="h-full w-full object-cover transition-all duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
          </Link>
        )}
      </div>

      <div className="p-5">
        <Link to={`/blog/${documentId}`}>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 leading-tight hover:text-blue-600 transition">
            {title}
          </h3>
        </Link>

  <div className="mt-2 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          {uploadedDate && (
            <span>{new Date(uploadedDate).toLocaleDateString()}</span>
          )}

          {author && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-400"></span>
              <span className="font-medium">{author}</span>
            </>
          )}
        </div>

        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
          {preview}...
        </p>

        <div className="mt-4">
          <Link
            to={`/blog/${documentId}`}
            className="inline-flex items-center gap-1 text-blue-600 font-medium hover:gap-2 transition-all"
          >
            Read more
            <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
