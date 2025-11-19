export const BASE_URL = "http://localhost:1337";

export const API = {
  blogs: `${BASE_URL}/api/blogs`,
};

export const endpoints = {
  // GET all blogs
  listBlogs: (query = "?populate=*") => `${API.blogs}${query}`,

  // GET one blog by ID
singleBlog: (documentId, query = "?populate=*") => 
    `${API.blogs}/${documentId}${query}`,

};
