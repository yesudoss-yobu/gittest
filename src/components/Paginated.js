import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

const Paginated = () => {
  const [page, setpage] = useState(1);
  const getUsers = (pageNumber) =>
    axios.get(`http://localhost:4000/users?_limit=2&_page=${pageNumber}`);
  const {
    isInitialLoading,
    isLoading,
    isError,
    data,
    status,
    error,
    retry,
    isFetching,
  } = useQuery(["Get-Users", page], () => getUsers(page), {
    keepPreviousData: true,
  });
  console.log({
    isLoading,
    isFetching,
    isInitialLoading,
    isError,
    status,
    retry,
  });

  return (
    <>
      <h1>Paginated Queries</h1>
      {isLoading && <h1>loading...</h1>}
      {data?.data.map((user) => (
        <main key={user.id}>
          <h3 style={{ color: "darkblue" }}>
            {/* {user.id}. {user.username} */}
            {user.id}. {user.name}
          </h3>
        </main>
      ))}
      {isError && <h2>{error.message}</h2>}
      <button onClick={() => setpage(page - 1)} disabled={page === 1}>
        previous page
      </button>
      <br />
      <button onClick={() => setpage(page + 1)} disabled={page === 5}>
        Next page
      </button>
    </>
  );
};

export default Paginated;
