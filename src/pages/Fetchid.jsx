import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchIndividual } from "../API/api";  // Fix function name
import { useParams, NavLink } from "react-router-dom";

const Fetchid = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", id],  // Ensure unique cache per post
    queryFn: () => fetchIndividual(id),  // Pass correct function
  });

  if (isLoading) return <p>Loading post...</p>;
  if (isError) return <p>Error: {error?.message || "Failed to fetch post."}</p>;

  return (
    <>
      <h1>Post Details - {id}</h1>
      {data ? (
        <ul>
          <li>
            <h3>Title: {data.title}</h3>
            <p>ID: {data.id}</p>
            <p>Body: {data.body}</p>
          </li>
        </ul>
      ) : (
        <p>Post not found.</p>
      )}
      <NavLink to="/new">
        <button>Back to Posts</button>
      </NavLink>
    </>
  );
};

export default Fetchid;
