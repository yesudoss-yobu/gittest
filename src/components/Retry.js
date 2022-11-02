import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

const Retry = () => {
  const getUsers = () => axios.get("http://localhost:4000/userss");
  const {
    isInitialLoading,
    isLoading,
    isError,
    data,
    status,
    error,
    isFetching,
    retry,
  } = useQuery(["Get-Users"], getUsers, {
    // retry: false,
    // retry: true,
    // retry: 20,
    // retry : (failureCount, error) => your code
    // retryDelay: 1000,
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
      <h1>Retries</h1>
      <ul>
        {data?.data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      {isError && <h2>{error.message}</h2>}
    </>
  );
};

export default Retry;
