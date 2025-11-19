import BlogList from './components/BlogList.jsx'

export default function HomePage() {
  return (
    <section>
  <div className="mb-8 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white">
        <h1 className="text-2xl font-bold">Welcome to Bloggy</h1>
        <p className="mt-2 text-blue-100">Fresh posts from your Strapi backend.</p>
      </div>

      <h2 className="mb-4 text-xl font-semibold">Latest Blogs</h2>
      <BlogList />
    </section>
  )
}
