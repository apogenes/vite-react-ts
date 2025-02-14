import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import withReactRouter from "vite-plugin-next-react-router";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    withReactRouter({
      pageDir: "src/page",
      extensions: ["ts", "tsx"],
      layout: "_layout",
    }),
  ],
});
