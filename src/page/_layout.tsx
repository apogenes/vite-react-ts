import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { getClient } from "@/lib/queryClient";
import "@/style/globals.css";

const Layout: React.FC = () => {
  const queryClient = getClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="mx-auto flex min-h-screen w-full max-w-[460px] min-w-[460px] flex-col bg-white shadow-lg max-[460px]:min-w-0">
        <Suspense fallback={"loading..."}>
          <Outlet />
        </Suspense>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Layout;
