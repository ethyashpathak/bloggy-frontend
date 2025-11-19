import { useEffect, useState } from 'react'
import BlogCard from './BlogCard.jsx'
import { endpoints } from '../config.js'

export default function BlogList() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    fetch(endpoints.listBlogs())
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`)
        const json = await res.json()
        return json
      })
      .then((json) => {
        if (!isMounted) return
        setBlogs(Array.isArray(json?.data) ? json.data : [])
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

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 animate-pulse rounded-xl border bg-gray-50" />
        ))}
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

  if (!blogs.length) {
    return <p className="text-gray-600">No blogs found.</p>
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((b) => (
        <BlogCard key={b.documentId} blog={b} />
      ))}
    </div>
  )
}
