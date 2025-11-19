import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './app/layout.jsx'
import HomePage from './app/page.jsx'
import BlogPage from './app/blog/[documentId]/page.jsx'
import CreateBlogPage from './app/blog/create-blog.jsx'
import LoginPage from './app/login.jsx'
import SignupPage from './app/signup.jsx'
import MyBlogs from './app/components/MyBlog.jsx'
import SearchResults from './app/components/SearchResults.jsx'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="my-blogs" element={<MyBlogs />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="blogs" element={<HomePage />} />
          <Route path="create-blog" element={<CreateBlogPage />} />
          <Route path="blog/:documentId" element={<BlogPage />} />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
