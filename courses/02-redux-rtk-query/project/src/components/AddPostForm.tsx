/** Stub: Complete Challenge 09 (Mutations) per README. */

import { useAddPostMutation, useGetPostsQuery } from "../api/apiSlice"
import { useState } from "react";

export default function AddPostForm() {
  const [addPost, { isLoading, isSuccess }] = useAddPostMutation();

  const [post, setPost] = useState({
    userId: 0,
    title: "",
    body: ""
  })

  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addPost({ userId: post.userId, title: post.title, body: post.body });
    setPost({
      userId: 0,
      title: "",
      body: ""
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }


  return (
    <>
      <form data-testid="add-post-form" onSubmit={handleSubmit}>
        Complete Challenge09 per README.

        <h2>Add Post</h2>
        <input type="number" name="userId" value={post.userId} onChange={handleChange} />
        <input type="text" name="title" value={post.title} onChange={handleChange} />
        <textarea name="body" value={post.body} onChange={handleChange} />

        <button type="submit" data-testid="add-post-submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>

        {isSuccess && <p>Post added successfully!</p>}
      </form>
    </>
  );
}
