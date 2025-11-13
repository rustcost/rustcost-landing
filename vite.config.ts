import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/docker-hub": {
        target: "https://hub.docker.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/docker-hub/, ""),
      },
    },
  },
});
