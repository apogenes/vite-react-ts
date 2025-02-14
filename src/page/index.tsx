import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import "./index.css"
import { Product } from "./type"
import { fetcher, QueryKeys } from "@lib/queryClient"

function Main() {
  const [count, setCount] = useState(0)

  const { data } = useQuery<Product[], Error>({
    queryKey: [QueryKeys.PRODUCTS],
    queryFn: () => fetcher({ method: "GET", path: "/products" }),
  });
  console.log(data);

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
