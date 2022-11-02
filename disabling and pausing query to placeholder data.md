## 1. Disabling/Pausing Queries:

    A library for fetching data in a React application

When enabled is false:

1. If the query has cached data
   The query will be initialized in the status === 'success' or
   isSuccess state.

2. If the query does not have cached data
   The query will start in the status === 'loading' and fetchStatus === 'idle'

3. The query will not automatically fetch on mount.

4. The query will not automatically refetch in the background

5. The query will ignore query client invalidateQueries and refetchQueries calls that would normally result in the query refetching.

6. refetch returned from useQuery can be used to manually trigger the query to fetch.

### Lazy Queries

1. Lazy queries will be in status: 'loading' right from the start because loading means that there is no data yet. This is technically true, however, since we are not currently fetching any data (as the query is not enabled), it also means you likely cannot use this flag to show a loading spinner.

2. If you are using disabled or lazy queries, you can use the isInitialLoading flag instead. It's a derived flag that is computed from:

isLoading && isFetching

3. so it will only be true if the query is currently fetching for the first time.

## 2. Query Retries:

- When a useQuery query fails (the query function throws an error), React Query will automatically retry the query if that query's request has not reached the max number of consecutive retries (defaults to 3) or a function is provided to determine if a retry is allowed.

1. You can configure retries both on a global level and an individual query level.

- Setting retry = false will disable retries.

- Setting retry = 6 will retry failing requests 6 times before showing

- the final error thrown by the function.

- Setting retry = true will infinitely retry failing requests.

- Setting retry = (failureCount, error) => ... allows for custom logic based on why the request failed.

### Retry Delay

- By default, retries in React Query do not happen immediately after a request fails. As is standard, a back-off delay is gradually applied to each retry attempt.

- The default retryDelay is set to double (starting at 1000ms) with each attempt, but not exceed 30

## 3. Paginated / Lagged Queries:

- The UI jumps in and out of the success and loading states because each new page is treated like a brand new query.

## Better Paginated Queries with `keepPreviousData`

- The data from the last successful fetch available while new data is being requested, even though the query key has changed.

- When the new data arrives, the previous `data` is seamlessly swapped to show the new data.

- `isPreviousData` is made available to know what data the query is currently providing you

### Lagging Infinite Query results with `keepPreviousData`

- While not as common, the keepPreviousData option also works flawlessly with the useInfiniteQuery hook,

- so you can seamlessly allow your users to continue to see cached data while infinite query keys change over time.

## 4. Infinite Queries:

When using useInfiniteQuery, you'll notice a few things are different:

- `data` is now an object containing infinite query data:

- `data.pages` array containing the fetched pages

-`data.pageParams` array containing the page params used to fetch the pages

- The `fetchNextPage` and fetchPreviousPage functions are now available

- The `getNextPageParam` and `getPreviousPageParam` options are available for both determining if there is more data to load and the information to fetch it. This information is supplied as an additional parameter in the query function (which can optionally be overridden when calling the fetchNextPage or `fetchPreviousPage` functions)

- A `hasNextPage` boolean is now available and is true if `getNextPageParam` returns a value other than undefined

- A `hasPreviousPage` boolean is now available and is true if getPreviousPageParam returns a value other than undefined

- The `isFetchingNextPage` and `isFetchingPreviousPage` booleans are now available to distinguish between a background refresh state and a loading more state

### What happens when an infinite query needs to be `refetched`?

1. When an infinite query becomes stale and needs to be refetched, each group is fetched sequentially, starting from the first one. This ensures that even if the underlying data is mutated, we're not using stale cursors and potentially getting duplicates or skipping records. If an infinite query's results are ever removed from the queryCache, the pagination restarts at the initial state with only the initial group being requested.

`refetchPage`

- If you only want to actively refetch a subset of all pages, you can pass the `refetchPage` function to `refetch` returned from `useInfiniteQuery`.
