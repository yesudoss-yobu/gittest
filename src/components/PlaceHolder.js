// import React from "react";
// import axios from "axios";
// import { useQuery, useQueryClient } from "react-query";

// const PlaceHolder = () => {
//   const getUsers = () => axios.get("http://localhost:4000/users");
//   const queryClient = useQueryClient();
//   const {
//     isInitialLoading,
//     isLoading,
//     isError,
//     data,
//     status,
//     error,
//     isFetching,
//     retry,
//   } = useQuery(["Get-Users"], getUsers, {
//     placeholderData: () => queryClient.getQueryData(["blogPosts"]),
//   });
//   console.log({
//     isLoading,
//     isFetching,
//     isInitialLoading,
//     isError,
//     status,
//     retry,
//   });

//   return (
//     <>
//       <h1>Placeholder queries</h1>
//       {isLoading && <h2>Loading...</h2>}
//       <ul>
//         {data.data?.map((user) => (
//           <li key={user.id}>{user.name}</li>
//         ))}
//       </ul>
//       {isError && <h2>{error.message}</h2>}
//     </>
//   );
// };
// placeholderData: () =>
//   queryClient.getQueryData(["user"])?.find((user) => user?.id === 1),
// export default PlaceHolder;
// import { useQuery, useQueryClient } from "react-query";
// const queryClient = useQueryClient();

import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const initialData = {
  data: [
    {
      id: 11,
      name: "arun",
      username: "arun arun",
    },
    {
      id: 12,
      name: "vijay",
      username: "vijay arun",
    },
    {
      id: 13,
      name: "selva",
      username: "selva arun",
    },
  ],
};

const PlaceHolder = () => {
  const getUsers = () => axios.get("http://localhost:4000/users");
  const { data, isLoading, isFetching } = useQuery("user", getUsers, {
    placeholderData: initialData,
    // initialData: initialData,
  });

  console.log("Data ", data);

  return (
    <>
      <h1>Placeholder queries</h1>
      {isLoading && <h2>Loading...</h2>}
      <ul>
        {data?.data?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
};

export default PlaceHolder;
