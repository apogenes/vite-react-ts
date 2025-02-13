import { useMemo } from "react";
import { useRoutes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { routes } from "./routes";

export default function App() {
  const queryClient = useMemo(() => new QueryClient(), []);
  const elem = useRoutes(routes);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{elem}</BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
