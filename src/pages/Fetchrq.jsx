import React, { useState } from "react";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { FetchPosts, deletePost } from "../API/api";
import { NavLink } from "react-router-dom";

const Fetchrq = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", pageNumber],
    queryFn: () => FetchPosts(pageNumber),
    placeholderData: keepPreviousData,
      // gcTime: 1000 * 60 * 60, 
   // staleTime: 10000, 
   // refetchInterval:1000, 
   // refetchIntervalInBackground: true,
  });

  const deleteMutating = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      alert("Post deleted successfully!");
    },
    onError: (error) => {
      alert(error.message || "Failed to delete post.");
    },
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error: {error?.message || "Failed to fetch posts."}</p>;

  return (
    <div>
      <h1>Fetch New</h1>
      <ul>
        {data.length > 0 ? (
          data.map(({ id, title, body }) => (
            <li key={id}>
              <NavLink to={`/new/${id}`} style={{ padding: "2px", margin: "3px" }}>
                <h3>{title}</h3>
                <p>{body}</p>
              </NavLink>
              <button 
                onClick={() => deleteMutating.mutate(id)}
                disabled={deleteMutating.isLoading}
              >
                {deleteMutating.isLoading ? "Deleting..." : "Delete"}
              </button>
              <button>update</button>
            </li>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </ul>

      <div>
        <button 
          disabled={pageNumber === 0} 
          onClick={() => setPageNumber((prev) => prev - 1)}
        >
          Prev
        </button>
        <h2>{pageNumber + 1}</h2>
        <button 
          onClick={() => setPageNumber((prev) => prev + 1)}
          disabled={data.length === 0} // Prevent fetching if no more posts
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Fetchrq;
