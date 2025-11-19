import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BASE_URL, endpoints } from '../../config.js'

function getImageUrl(coverImage) {
  const url = coverImage?.url
  if (!url) return null
  return url.startsWith('http') ? url : `${BASE_URL}${url}`
}

export default function BlogPage() {
  const { documentId } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    setLoading(true)

    fetch(endpoints.singleBlog(documentId))
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to fetch blog: ${res.status}`)
        return res.json()
      })
      .then((json) => {
        if (!isMounted) return
        setBlog(json?.data ?? null)
        setError(null)
      })
      .catch((err) => {
        if (!isMounted) return
        setError(err.message || 'Something went wrong')
      })
      .finally(() => {
        if (!isMounted) return
        setLoading(false)
      })

    console.log("PARAM RECEIVED:", documentId)
    console.log("FETCH URL:", endpoints.singleBlog(documentId))

    return () => {
      isMounted = false
    }
  }, [documentId])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-64 w-full animate-pulse rounded-xl bg-gray-200" />
        <div className="h-8 w-1/2 animate-pulse rounded bg-gray-200" />
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 w-full animate-pulse rounded bg-gray-100" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
        {error}
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="text-gray-600">
        Blog not found. <Link to="/" className="text-blue-600 underline">Go back</Link>
      </div>
    )
  }

  // ⭐⭐ STRAPI V5 — FIELDS ARE DIRECTLY ON blog, not blog.attributes
  const {
    author,
    title = 'Untitled',
    content = '',
    uploadedDate,
    coverImage
  } = blog

  const coverUrl = getImageUrl(coverImage)

  return (
    <article className="mx-auto max-w-3xl">
      {coverUrl && (
        <img
          src={coverUrl}
          alt={title}
          className="mb-6 aspect-video w-full rounded-xl object-cover"
        />
      )}
      
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <h2 className='text-gray-500 font-bold'>by {author}</h2>
   
      {uploadedDate && (
        <p className="mt-2 text-sm text-gray-500">
          {new Date(uploadedDate).toLocaleDateString()}
        </p>
      )}

      <div className="prose mt-6 max-w-none prose-headings:scroll-mt-20 prose-a:text-blue-600 hover:prose-a:text-blue-700">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </article>
  )
}
