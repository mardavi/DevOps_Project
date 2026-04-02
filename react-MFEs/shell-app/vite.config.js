// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import federation from "@originjs/vite-plugin-federation";

// export default defineConfig({
//   plugins: [
//     react(),
//     federation({
//       name: "shellApp",
//       remotes: {
//         authApp: "http://localhost:5174/assets/remoteEntry.js",
//         projectsApp: "http://localhost:5175/assets/remoteEntry.js",
//       },
//       shared: ["react", "react-dom", "@apollo/client", "graphql"],
//     }),
//   ],
//   server: {
//     port: 5173,
//     strictPort: true,
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shellApp",
      remotes: {
        authApp: "http://localhost:5174/assets/remoteEntry.js",
        projectsApp: "http://localhost:5175/assets/remoteEntry.js",
        aiReviewApp: "http://localhost:5176/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "@apollo/client", "graphql"],
    }),
  ],
  server: {
    port: 5173,
    strictPort: true,
  },
});
