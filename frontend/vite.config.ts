/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: remove /api prefix if needed
      },
    },
  },
  test: {
    globals: true, // Enable global "describe", "it", and "expect"
    environment: "jsdom", // Use browser-like environment
  },
});
