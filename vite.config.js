import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite konfiguratsiya
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["react-player"],
    },
  },
});
