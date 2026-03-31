import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell_app",
      remotes: {
        projects_app: "http://localhost:5174/assets/remoteEntry.js",
        ai_review_app: "http://localhost:5175/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "react-bootstrap", "react-router-dom"],
    }),
  ],
  server: {
    port: 5173,
  },
  preview: {
    port: 5173,
  },
});
