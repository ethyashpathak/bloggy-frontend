import { useState } from "react";
import { BASE_URL } from "../config.js";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Protect route
  if (!token) {
    return (
      <div className="text-center mt-20 text-red-600 font-semibold animate-fadeIn">
        You must be logged in to create blogs.
        <br />
        <a href="/login" className="text-blue-600 underline">
          Go to Login
        </a>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("Uploading...");

    try {
      const author = user.username || user.email;
      const uploadedDate = new Date().toISOString().split("T")[0];

      let imageId = null;

      // Upload Image
      if (coverImage) {
        const imgData = new FormData();
        imgData.append("files", coverImage);

        const uploadRes = await fetch(`${BASE_URL}/api/upload`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: imgData,
        });

        const uploaded = await uploadRes.json();
        imageId = uploaded[0]?.id;
      }

      // Create Blog Entry
      const res = await fetch(`${BASE_URL}/api/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            title,
            content,
            author,
            uploadedDate,
            coverImage: imageId,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error?.message || "Failed");

      setMessage("🎉 Blog created successfully!");
      setTitle("");
      setContent("");
      setCoverImage(null);
      setPreview(null);
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    setCoverImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  }

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <div className="mb-8 rounded-2xl bg-white shadow-lg border border-gray-200 p-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          ✍️ Create a New Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blog Title
            </label>
            <input
              type="text"
              placeholder="Enter blog title..."
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blog Content
            </label>
            <textarea
              placeholder="Write your blog in Markdown..."
              className="w-full p-3 rounded-lg border h-44 resize-none focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image
            </label>

            <label className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition">
              <span className="text-gray-500">Click to upload image</span>
              <input type="file" className="hidden" onChange={handleImageChange} />
            </label>

            {preview && (
              <img
                src={preview}
                className="mt-3 h-40 w-full object-cover rounded-xl shadow border hover:scale-[1.02] transition"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 shadow-md transition"
          >
            Publish 🚀
          </button>

          {/* Message */}
          {message && (
            <p
              className={`text-sm mt-2 ${
                message.startsWith("❌") ? "text-red-600" : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
