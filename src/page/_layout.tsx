import { LayoutProvider } from "@/app/layout/layoutProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutProvider>{children}</LayoutProvider>;
}