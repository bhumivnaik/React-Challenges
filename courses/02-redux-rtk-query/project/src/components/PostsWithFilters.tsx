/** Stub: Complete Challenge 11 (API and Local State) per README. */

import { useGetPostsQuery } from "../api/apiSlice"
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { filterPost } from "../store/slices/filtersSlice";

export default function PostsWithFilters() {

  const { data: posts, isLoading, isError } = useGetPostsQuery();
  const filters = useAppSelector(state => state.filters);
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>Something went wrong in filtering</h2>
  }

  function handleUserChange(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(filterPost(e.target.value === "all" ? null : Number(e.target.value)));
  }

  let displayedPosts = [...(posts ?? [])];

  if (filters.filterUserId !== null) {
    displayedPosts = displayedPosts.filter(
      (post) => post.userId === filters.filterUserId
    );
  }

  return (
    <>
      <div data-testid="filter-controls">
        User:
        <select name="filter" onChange={handleUserChange}
          value={filters.filterUserId === null
            ? "all" : filters.filterUserId
          }  >
          <option value="all">All users</option>
          <option value="1">User 1</option>
          <option value="2">User 2</option>
        </select>
      </div>

      <div data-testid="posts-with-filters">
        Complete Challenge 11 per README.
        <h2>Posts</h2>

        {displayedPosts.map((post) => (
          <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <small>
              User: {post.userId}
            </small>
          </article>
        ))}

      </div>

    </>
  );
}
