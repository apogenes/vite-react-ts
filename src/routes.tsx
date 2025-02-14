import { lazy } from "react";
import GlobalLayout from "@page/_layout";

const Index = lazy(() => import("@page/index"));
const PoroductIndex = lazy(() => import("@page/product/index"));
const ProductId = lazy(() => import("@page/product/[id]"));

export const routes = [
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/product", element: <PoroductIndex /> },
      { path: "/product/:id", element: <ProductId /> },
    ],
  },
];

export const pages = [
  { route: "/" },
  { route: "/product" },
  { route: "/product/:id" },
];