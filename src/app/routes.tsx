import { lazy } from "react";
import GlobalLayout from "@page/_layout";

const Index = lazy(() => import("@page/index"));
const PoroductIndex = lazy(() => import("@page/product/index"));
const ProductDetail = lazy(() => import("@page/product/[id]"));
const InvitationDetail = lazy(() => import("@page/invitation/[id]"));

export const routes = [
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/product", element: <PoroductIndex /> },
      { path: "/product/:id", element: <ProductDetail /> },
      { path: "/invitation/:id", element: <InvitationDetail /> },
    ],
  },
];

export const pages = [
  { route: "/" },
  { route: "/product" },
  { route: "/product/:id" },
  { route: "/invitation/:id" },
];