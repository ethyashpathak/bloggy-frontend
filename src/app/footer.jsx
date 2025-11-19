export default function Footer() {
  return (
    <footer className="relative mt-16 w-full">
      <div className="absolute inset-0 -top-10 h-20 bg-linear-to-b from-blue-500/10 to-transparent blur-xl pointer-events-none" />

      {/* Full-width container */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="w-full rounded-none bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-t border-white/30 dark:border-gray-700/40 shadow-lg p-6 sm:p-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                Bloggy
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Share your stories. Inspire the world.
              </p>
            </div>

            <div className="flex gap-6 text-sm">
              <a
                href="/"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Home
              </a>
              <a
                href="/blogs"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Blogs
              </a>
              <a
                href="/create-blog"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Create
              </a>
              <a
                href="/my-blogs"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                My Blogs
              </a>
            </div>
          </div>

          <div className="border-t border-gray-300/40 dark:border-gray-700/40 my-6" />

          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} <b>Bloggy</b>. All rights reserved.
            </p>

            <div className="flex gap-4 mt-3 sm:mt-0">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <i className="ri-github-fill text-xl" />
              </a>

              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <i className="ri-twitter-x-line text-xl" />
              </a>

              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <i className="ri-linkedin-fill text-xl" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
