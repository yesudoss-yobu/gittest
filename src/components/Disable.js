import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";

const ReactQuery = () => {
  const [userData, setUserData] = useState("");
  const getUsers = () => axios.get("http://localhost:4000/friends");
  const {
    isInitialLoading,
    isLoading,
    isError,
    data,
    status,
    error,
    isFetching,
    refetch,
  } = useQuery(["Get-Users", userData], getUsers, {
    enabled: true,
    // cacheTime: 5000,
    // enabled: !!userData,
  });
  console.log({ isLoading, isFetching, isError, status });

  return (
    <>
      <h1>{userData}</h1>
      <h1>Disabling/Pausing Queries</h1>
      <button onClick={() => refetch()}>manual fetch</button>
      <br />
      {/* <button onClick={() => setUserData("data")}>lazy fetch & set data</button> */}
      <br />

      {data ? (
        <>
          <ul>
            {data?.data.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </>
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : isInitialLoading ? (
        <span>Loading...</span>
      ) : (
        <span>Not ready ...</span>
      )}
      <div>{isFetching ? "Fetching..." : null}</div>
    </>
  );
};

export default ReactQuery;
