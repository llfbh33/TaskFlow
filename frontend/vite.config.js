import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    eslint({
      lintOnStart: true,
      failOnError: mode === "production"
    })
  ],
  build: { chunkSizeWarningLimit: 1000, },
  server: mode === "development" ? {
    open: true,
    proxy: {
      '/api': 'http://localhost:8000',  // needs to be 5000 on laptop
    },
  } : undefined,
  preview: {
    allowedHosts: ["frontend-production-583c.up.railway.app"]
  }
}));





// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import eslint from 'vite-plugin-eslint';
// import svgrPlugin from 'vite-plugin-svgr';

// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => ({
//   plugins: [
//     react(),
//     eslint({
//       lintOnStart: true,
//       failOnError: mode === "production"
//     }),
//     svgrPlugin({
//       svgrOptions: {
//         icon: true,
//         // Add other SVGR options here if needed
//       },
//     })
//   ],
//   server: {
//     open: true,
//     proxy: {
//       '/api': 'http://localhost:8000'
//     },
//   },
// }));
