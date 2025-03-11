import { Toaster } from "@/shared/ui/sonner"

export function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[460px] min-w-[460px] flex-col bg-white shadow-lg max-[460px]:min-w-0">
      {/* <header>공통 헤더</header> */}
      <main>{children}</main>
      {/* <footer>공통 푸터</footer> */}
      <Toaster richColors position="top-center" />
    </div>
  );
}