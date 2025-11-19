import BlogList from './components/BlogList.jsx'

export default function HomePage() {
  return (
    <section className="animate-fadeIn">

      
      <div
        className="mb-10 relative overflow-hidden rounded-2xl p-8 text-white shadow-lg 
        dark:shadow-blue-950/40 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bg1.jpg')",
        }}
      >
        
        <div className="absolute inset-0 bg-gradient-to-r 
            from-indigo-700/80 via-blue-700/75 to-cyan-600/70
            dark:from-indigo-900/80 dark:via-blue-900/70 dark:to-cyan-800/60">
        </div>

        
        <div className="absolute inset-0 opacity-15 
          bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/dot-grid.png')]">
        </div>

      
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Welcome to <span className="text-yellow-300">Bloggy</span>
          </h1>

          <p className="mt-3 text-blue-100 text-lg max-w-xl">
            Fresh posts, clean design, and your Strapi-powered content delivered beautifully.
          </p>

          <div className="mt-6 flex gap-4">
            <a
              href="/create-blog"
              className="px-5 py-2.5 rounded-lg bg-white text-blue-700 font-semibold shadow 
                hover:bg-blue-50 transition 
                dark:bg-gray-900 dark:text-blue-300 dark:hover:bg-gray-800"
            >
              Write a Blog
            </a>

            <a
              href="/blogs"
              className="px-5 py-2.5 rounded-lg bg-blue-700/40 backdrop-blur-md text-white border 
              border-white/30 font-medium hover:bg-blue-700/60 transition 
              dark:bg-blue-600/40 dark:hover:bg-blue-600/60"
            >
              Explore Blogs →
            </a>
          </div>
        </div>
      </div>

      
      <BlogList />
    </section>
  );
}
