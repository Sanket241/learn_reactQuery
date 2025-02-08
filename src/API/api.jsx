import axios from "axios";

const api = axios.create({
  baseURL: "http://jsonplaceholder.typicode.com",
});

export const FetchPosts = async (pageNumber = 0) => {
  try {
    const res = await api.get(`/posts?_start=${pageNumber * 3}&_limit=3`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    throw new Error("Failed to fetch posts.");
  }
};

// Fetch individual post
export const fetchIndividual = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching individual post:", error.message);
    throw new Error("Failed to fetch the post.");
  }
};

export const deletePost =  (id) => {
  try {
    const response = api.delete(`/posts/${id}`);
    return response.status === 200 ? id : null;
  } catch (error) {
    console.error("Error deleting post:", error.message);
    throw new Error("Failed to delete post.");
  }
};

export const updatePost = async (id) => {
  
  try {
    const response = await api.put(`/posts/${id}`, { title: "Updated Title", body});
    return response.data; 
  } catch (error) {
    console.error("Error updating post:", error.message);
    throw new Error("Failed to update post.");
  }
};

