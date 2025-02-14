import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import "./index.css"
import { Product } from "./type"
import { fetcher, QueryKeys } from "@lib/queryClient"

// export function useAfterQuery<TData = unknown, TError>({
//   queryResult,
//   enabled,
//   onSuccess,
//   onError,
// }: QueryCallbacks<TData, TError>) {
//   useEffect(() => {
//     if (!enabled) return;
//     if (queryResult.isSuccess && onSuccess) {
//       onSuccess(queryResult.data);
//     }
//   }, [enabled, queryResult.isSuccess, queryResult.data, onSuccess]);

//   useEffect(() => {
//     if (!enabled) return;
//     if (queryResult.isError && onError) {
//       onError(queryResult.error);
//     }
//   }, [enabled, queryResult.isError, queryResult.error, onError]);
// }

function Main() {
  const [count, setCount] = useState(0)

  const queryResult = useQuery<Product[], Error>({
    queryKey: [QueryKeys.PRODUCTS],
    queryFn: () => fetcher({ method: "GET", path: "/products" }),
    enabled: true,
  });

  const handleSuccess = useCallback((data: Product[]) => {
    console.log(data);
  }, []);

  const handleError = useCallback((error: Error) => {
    console.log(error);
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Main</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default Main
