import axios from "axios";

const api = axios.create({
  baseURL: "http://jsonplaceholder.typicode.com",
});

export const FetchPosts = async (pageNumber = 0) => {
  try {
    const res = await api.get(`/posts?_start=${pageNumber * 3}&_limit=3`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Fetch individual post
export const fetchIndividual = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
