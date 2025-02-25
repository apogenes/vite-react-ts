import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { DefaultLayout } from "@/app/layout/defaultLayout";
import { getClient } from "@/shared/api/queryClient";
import "@/app/style/globals.css";

interface LayoutProviderProps {
  children: React.ReactNode;
}

export function LayoutProvider({ children }: LayoutProviderProps) {
  const queryClient = getClient();
  return (
    <QueryClientProvider client={queryClient}>
      <DefaultLayout>
        <Suspense fallback={"loading..."}>{children ?? <Outlet />}</Suspense>
      </DefaultLayout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
