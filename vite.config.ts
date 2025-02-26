import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import withReactRouter from "vite-plugin-next-react-router";
import dotenv from "dotenv";
import svgr from "vite-plugin-svgr";

dotenv.config();

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
    svgr({
      svgrOptions: {
        svgo: true, // SVG 최적화 활성화
        svgoConfig: {
          plugins: [{ removeViewBox: false }], // viewBox 제거 방지
        },
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.VITE_PORT || "8090", 10),
    hmr: {
      overlay: false,
    },
    open: false,
  },
});
