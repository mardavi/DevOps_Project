import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "projects_app",
      filename: "remoteEntry.js",
      exposes: {
        "./ProjectsApp": "./src/App.jsx",
      },
      shared: [
        "react",
        "react-dom",
        "react-bootstrap",
        "@apollo/client",
        "graphql",
      ],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5174,
    strictPort: true,
  },
  preview: {
    port: 5174,
    strictPort: true,
  },
});