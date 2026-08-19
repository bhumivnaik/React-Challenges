import { useGetUsersQuery } from "../api/apiSlice"
import ErrorDisplay from "./ErrorDisplay";

export default function UsersList() {
  const { data, isLoading, error, isError, refetch } = useGetUsersQuery();


  if (isLoading) {
    return <h2 data-testid="users-loading">Loading...</h2>;
  }
  if (error) {
    return <h2 data-testid="users-error">
      <ErrorDisplay
        error={error}
        onRetry={refetch} />
    </h2>;
  }

  return (
    <>
      <div data-testid="users-list">
        <h2>Users</h2>

        <ul>
          {data?.map((user) => (
            <li key={user.id}>
              {user.name}
            </li>
          ))}
        </ul>
      </div>

    </>
  );
}


//useQueryHook
