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
    server: {
      open: true,
      proxy: {
        '/api': 'http://localhost:8000'
      },
    },
  // To automatically open the app in the browser whenever the server starts,
  // uncomment the following lines:

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
