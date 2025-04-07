import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],

  server: {
    host: "0.0.0.0",
    port: 4000,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
    },
  },
});
