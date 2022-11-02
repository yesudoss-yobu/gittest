import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { useState } from "react";

const Crud = () => {
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [age, setAge] = useState("");

  // console.log(name);
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
  } = useQuery(["Get-Users"], getUsers, {
    enabled: true,
  });
  // console.log({ isLoading, isFetching, isError, status });

  const submitHandler = () => {
    console.log({ name: name, age: age, userName: userName });
  };

  const PostUsers = (friends) =>
    axios.post("http://localhost:4000/friends", friends);

  return (
    <>
      <h1>Mutation</h1>

      <br />
      <br />
      <input
        type="text"
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="userName"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="age"
        onChange={(e) => setAge(e.target.value)}
      />
      <button onClick={submitHandler}>submit</button>

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

export default Crud;
