/** Stub: Complete Challenge 08 (Caching and Refetch) per README. */
import { useGetPostsQuery } from "../api/apiSlice"
import { Link } from "react-router-dom";


export default function PostsList() {

  const { data, isLoading, error } = useGetPostsQuery();

  if (isLoading) {
    return <h2 data-testid="posts-loading">Loading...</h2>;
  }
  if (error) {
    return <h2 data-testid="posts-error">Failed to load users.</h2>;
  }

  return (
    <div data-testid="posts-list">
      Complete Challenge-08 per README.
      <ul>

        {data?.map((post) => (
          <Link to={`/challenge/13-query-parameters/${post.id}`}>
            <li key={post.id}>{post.title}<br></br><p>{post.body}</p></li>
          </Link>
        ))}

      </ul>
    </div>
  );
}
