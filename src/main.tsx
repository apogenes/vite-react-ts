import { StrictMode, useEffect, useRef } from "react";
import { createRoot, Root } from "react-dom/client";

import App from "./App";
import "./styles/globals.css";

function Main() {
  const rootRef = useRef<Root | null>(null);

  useEffect(() => {
    const container: HTMLElement | null = document.getElementById("root");
    if (container && !rootRef.current) {
      rootRef.current = createRoot(container);
    }

    if (rootRef.current) {
      rootRef.current.render(
        <StrictMode>
          <App />
        </StrictMode>,
      );
    }
  }, []);

  return null;
}

export default Main;
