import { Link } from 'react-router-dom'
import { BASE_URL } from '../../app/config.js'

function getImageUrl(coverImage) {
  const url = coverImage?.url
  if (!url) return null
  return url.startsWith('http') ? url : `${BASE_URL}${url}`
}

export default function BlogCard({ blog }) {
  console.log("BLOGCARD RECEIVED:", blog);

  const {
    documentId,
    title = "Untitled",
    uploadedDate,
    content = "",
    coverImage,
  } = blog

  const preview = content.replace(/[#>*_`]/g, "").slice(0, 160)
  const img = getImageUrl(coverImage)

  return (
    <article className="group overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md">
      {img && (
        <Link to={`/blog/${documentId}`}>
          <img
            src={img}
            alt={title}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </Link>
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">
          <Link to={`/blog/${documentId}`} className="hover:underline">
            {title}
          </Link>
        </h3>

        {uploadedDate && (
          <p className="mt-1 text-xs text-gray-500">
            {new Date(uploadedDate).toLocaleDateString()}
          </p>
        )}

        <p className="mt-3 line-clamp-3 text-sm text-gray-600">{preview}...</p>

        <div className="mt-4">
          <Link
            to={`/blog/${documentId}`}
            className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  )
}
