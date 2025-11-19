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
      <div className="text-center mt-10 text-red-600 font-medium">
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
      // 🔥 Auto set author + date
      const author = user.username || user.email;
      const uploadedDate = new Date().toISOString().split("T")[0];

      let imageId = null;

      // 🔥 Upload Image
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

      // 🔥 Create Blog Entry
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
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Create a Blog</h1>

      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Content (Markdown)"
        className="w-full p-2 border rounded h-40"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <input type="file" onChange={handleImageChange} />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-2 h-32 rounded-lg object-cover border"
        />
      )}

      <button className="px-4 py-2 bg-blue-600 text-white rounded">Publish</button>

      {message && <p className="text-sm">{message}</p>}
    </form>
  );
}
