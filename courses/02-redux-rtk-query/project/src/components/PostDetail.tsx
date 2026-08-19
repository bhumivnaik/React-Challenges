/** Stub: Complete Challenge 13 (Query with Parameters) per README. */
import { useGetPostByIdQuery } from "../api/apiSlice"
import { useParams } from "react-router-dom";


export default function PostDetail() {
  const { postId } = useParams();
  const id = postId ? Number(postId) : undefined;
  const { data, isLoading } = useGetPostByIdQuery(id ?? 1, { skip: !id });


  if (!id) {
    return <p data-testid="post-detail">No post selected.</p>;
  }

  if (isLoading) {
    return <h2 data-testid="post-detail-loading">Loading...</h2>
  }

  if (!data) {
    return <p>No post found.</p>;
  }

  return <div data-testid="post-detail">
    <h2>{data.title}</h2>
    <p>{data.body}</p>
    <p>User ID: {data.userId}</p>
  </div>
}
