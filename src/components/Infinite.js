import React, { Fragment } from "react";
import axios from "axios";
import { useInfiniteQuery } from "react-query";

const Infinite = () => {
  const getUsers = ({ pageParam = 1 }) =>
    axios.get(`http://localhost:4000/users?_limit=2&_page=${pageParam}`);
  const {
    data,
    isError,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(["getUsers"], getUsers, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 5) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });
  console.log({
    isFetching,
  });
  console.log(data?.pages);
  return (
    <>
      <h1>Infinite queries</h1>
      {data?.pages.map((group, i) => {
        return (
          <Fragment key={i}>
            {group.data?.map((user) => (
              <h2 key={user.id}>{user.name}</h2>
            ))}
          </Fragment>
        );
      })}
      <button onClick={fetchNextPage} disabled={!hasNextPage}>
        show More
      </button>
    </>
  );
};

export default Infinite;
