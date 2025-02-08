import React, { useState } from "react";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FetchPosts, deletePost, updatePost } from "../API/api";
import { NavLink } from "react-router-dom";

const Fetchrq = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", pageNumber],
    queryFn: () => FetchPosts(pageNumber),
    placeholderData: keepPreviousData,
    // gcTime: 1000 * 60 * 60, 
    // staleTime: 10000, 
    //  refetchInterval:1000,
    //  refetchIntervalInBackground: true,
  });

  const deleteMutating = useMutation({
    mutationFn: (id)=>deletePost(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData(["posts", pageNumber], (currElem) =>{

        return currElem?.filter((elem) => elem.id !== id)
      }
      );
    },
    onError: (error) => {
      alert(error.message || "Failed to delete post.");
    },
  });

  const updateMutating = useMutation({
    mutationFn: (id) => updatePost(id),
    onSuccess: (apiData, postId) => {
      console.log(apiData, postId);
      
      // Ensure the cache is updated with the new data
      queryClient.setQueryData(["posts", pageNumber], (postData) => {
        return postData?.map((currPost) =>
          currPost.id === postId ? { ...currPost, ...apiData } : currPost
        );
      });
    },
    onError: (error) => {
      alert(error.message || "Failed to update post.");
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
              <button onClick={() => deleteMutating.mutate(id)} disabled={deleteMutating.isLoading}>
                {deleteMutating.isLoading ? "Deleting..." : "Delete"}
              </button>
              <button onClick={() => updateMutating.mutate(id)} disabled={updateMutating.isLoading}>
                {updateMutating.isLoading ? "Updating..." : "Update"}
              </button>
            </li>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </ul>

      <div>
        <button disabled={pageNumber === 0} onClick={() => setPageNumber((prev) => prev - 1)}>
          Prev
        </button>
        <h2>{pageNumber + 1}</h2>
        <button onClick={() => setPageNumber((prev) => prev + 1)} disabled={data.length === 0}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Fetchrq;
