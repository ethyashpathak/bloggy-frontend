import BlogList from './components/BlogList.jsx'

export default function HomePage() {
  return (
    <section className="animate-fadeIn">

      {/* ⭐ HERO SECTION */}
      <div className="mb-10 relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-8 text-white shadow-lg">

        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/dot-grid.png')]"></div>

        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Welcome to <span className="text-yellow-300">Bloggy</span>
          </h1>
          <p className="mt-3 text-blue-100 text-lg max-w-xl">
            Fresh posts, clean design, and your Strapi-powered content — delivered beautifully.
          </p>

          {/* CTA row */}
          <div className="mt-6 flex gap-4">
            <a
              href="/create-blog"
              className="px-5 py-2.5 rounded-lg bg-white text-blue-700 font-semibold shadow hover:bg-blue-50 transition"
            >
              ✍️ Write a Blog
            </a>
            <a
              href="/blogs"
              className="px-5 py-2.5 rounded-lg bg-blue-700/40 backdrop-blur-md text-white border border-white/30 font-medium hover:bg-blue-700/60 transition"
            >
              Explore Blogs →
            </a>
          </div>
        </div>
      </div>

      {/* ⭐ BLOG LIST */}
      <BlogList />
    </section>
  )
}
