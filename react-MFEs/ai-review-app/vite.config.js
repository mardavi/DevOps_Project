import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "ai_review_app",
      filename: "remoteEntry.js",
      exposes: {
        "./AIReviewApp": "./src/App.jsx",
      },
      shared: ["react", "react-dom", "react-bootstrap"],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5175,
  },
  preview: {
    port: 5175,
  },
});
