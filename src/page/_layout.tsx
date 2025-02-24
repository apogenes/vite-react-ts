import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Footer from "@widget/Footer";
import { getClient } from "@lib/queryClient";

const Layout: React.FC = () => {
  const queryClient = getClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={"loading..."}>
        <div className="w-full min-w-[460px] max-w-[460px] max-[460px]:min-w-0 min-h-screen mx-auto bg-white shadow-lg flex flex-col">
          <Outlet />
          <Footer />
        </div>
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Layout;
