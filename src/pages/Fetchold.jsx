import React, { useEffect, useState } from "react";
import { FetchPosts } from "../API/api";

const Fetchold = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPostData = async () => {
    try {
      const res = await FetchPosts(0); // Provide a default page number
      setPosts(res); // `res` is already the required data
      console.log(res);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <div>
      <h1>Fetch Old</h1>
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <ul>
          {posts.length > 0 ? (
            posts.map((item) => <li key={item.id}>{item.title}</li>)
          ) : (
            <p>No posts found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Fetchold;
