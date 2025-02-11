import { StrictMode } from "react";
import { createRoot, Root } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

// 전역 변수로 root를 선언
let root: Root | null = null;

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("root");

  if (container && !root) {
    root = createRoot(container);
  }

  if (root) {
    root.render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>,
    );
  }
});
