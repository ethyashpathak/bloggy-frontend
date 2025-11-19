<div align="center">

# Bloggy — React + Vite + Tailwind + Strapi

A clean, fast frontend for a Strapi-powered blog. Lists posts, shows a beautiful single post page with Markdown rendering, and includes a polished UI with dark mode and responsive layout.

</div>

---

## ✨ Features

- Home page that fetches all blog posts from Strapi: `GET /api/blogs?populate=*`
- Pretty blog cards: title, cover image, uploaded date, and short preview
- Dynamic single blog route: `/blog/:documentId`
- Markdown rendering with GitHub-flavored Markdown (links, tables, lists)
- Tailwind CSS v4 styling with modern components and animations
- Responsive Navbar (Home, Blogs, Create, etc.)
- Dark mode toggle (persisted in localStorage)
- Loading skeletons and friendly error states
- Configurable API base via a single config file

> Built with: React 19, Vite 7, Tailwind CSS 4, React Router, react-markdown, remark-gfm

---

## 🧱 Project structure

```
src/
  main.jsx
  App.jsx
  app/
    layout.jsx          # App shell (Navbar + content + footer area)
    page.jsx            # Home page (lists blogs)
    footer.jsx          # Footer
    theme.js            # Dark mode helpers (apply/toggle)
    config.js           # BASE_URL + endpoints
    blog/
      [documentId]/
        page.jsx        # Single blog page
      create-blog.jsx   # Create new blog (optional, requires auth)
    components/
      Navbar.jsx
      BlogList.jsx
      BlogCard.jsx
      ... (optional pages: MyBlog.jsx, SearchResults.jsx, etc.)
```

---

## ⚙️ Prerequisites

- Node.js 18+
- A running Strapi backend (recommended: Strapi v5) at `http://localhost:1337`
- In Strapi, create a Collection Type named “Blog” with fields like:
  - title: Text
  - content: Rich Text or Text (Markdown)
  - uploadedDate: Date
  - author: Text (optional)
  - coverImage: Media (Single)
- Make sure your Strapi CORS/permissions allow requests from your Vite dev URL (e.g., `http://localhost:5173`). For public read access, enable `find` and `findOne` on `Blog` for the Public role (or use auth/JWT).

---

## 🔧 Configuration

Set your Strapi API base URL in `src/app/config.js`:

```js
export const BASE_URL = "http://localhost:1337";

export const API = {
  blogs: `${BASE_URL}/api/blogs`,
};

export const endpoints = {
  listBlogs: (query = "?populate=*") => `${API.blogs}${query}`,
  singleBlog: (documentId, query = "?populate=*") => `${API.blogs}/${documentId}${query}`,
};
```

Images use Strapi’s media URLs: `imgUrl = BASE_URL + coverImage.url` when not absolute.

---

## 🚀 Getting started

Install dependencies and run the dev server:

```cmd
npm install
npm run dev
```

Build and preview production:

```cmd
npm run build
npm run preview
```

Open the app at the URL shown in your terminal (usually http://localhost:5173).

---

## 🧭 Routing

- `/` or `/blogs` — Home list (fetches `GET /api/blogs?populate=*`)
- `/blog/:documentId` — Single blog page (Markdown rendered)
- `/create-blog` — Optional create page (requires auth)
- `/login` — Optional login page (Strapi local auth)

> Note: The codebase uses `documentId` to match Strapi v5 REST IDs. If you’re on Strapi v4 (which returns `{ data: [{ id, attributes: {...}}] }`), see “Using Strapi v4” below to adjust mapping.

---

## 🌓 Dark mode

- Toggle in the Navbar (desktop and mobile)
- Theme is persisted in `localStorage` under `theme`
- `src/app/theme.js` handles applying/toggling via the `html.dark` class
- Tailwind v4 `dark:` variants are applied throughout (cards, lists, layout, prose)

---

## 📝 Markdown rendering

- `react-markdown` + `remark-gfm` for GFM features
- On the single blog page, Markdown content is rendered and inverted in dark mode via `dark:prose-invert`

---

## 🔐 Authentication (optional)

- Login page posts to Strapi: `POST /api/auth/local` with `{ identifier, password }`
- JWT and user are stored in `localStorage` (`token`, `user`)
- Create-blog page sends the JWT via `Authorization: Bearer <token>` and uploads media to `/api/upload`
- Ensure the authenticated role has permissions to create `Blog` and upload media

---

## 🧩 Using Strapi v4 (instead of v5)

This app is set up with Strapi v5’s `documentId` and flattened fields. If you are on v4, adapt the mapping:

- Lists return: `{ data: [{ id, attributes: { title, content, ... , coverImage: { data: { attributes: { url } } }}}] }`
- Singles return a similar `{ data: { id, attributes: {...} } }`

Minimal changes:
- In `BlogList.jsx`, map `json.data` into a flat array expected by `BlogCard`.
- In `BlogCard.jsx` and the single blog page, read from `attributes` and `coverImage.data.attributes.url`.

Alternatively, update your Strapi to v5 to match current code expectations.

---

## 🧪 Troubleshooting

- CORS/401/403: Allow your dev origin in Strapi and set correct permissions for Public/Authenticated roles.
- Images not showing: Check `coverImage.url` exists; prepend `BASE_URL` only if it’s not absolute.
- “Failed to resolve import … [id] …”: Bracketed folder names are literal in Vite (not dynamic like Next.js). Keep the paths exactly as in the repo or use conventional filenames.
- Tailwind v4 class names: Prefer `bg-linear-to-*` (instead of `bg-gradient-to-*`), and use fixed utilities like `after:h-0.5` instead of arbitrary values (e.g., `after:h-[2px]`).
- Blog not found: Ensure you’re passing a valid `documentId` and the entry is published/accessible.

---

## 🧰 Tech stack

- React 19, Vite 7
- Tailwind CSS 4
- React Router
- react-markdown, remark-gfm
- Strapi (headless CMS)

---

## 📄 License

Add a LICENSE file to the root of the repo (MIT is a good default for open-source). Until then, all rights reserved by the author.

---

## 🙌 Acknowledgements

- [Strapi](https://strapi.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [react-markdown](https://github.com/remarkjs/react-markdown) + [remark-gfm](https://github.com/remarkjs/remark-gfm)

---


