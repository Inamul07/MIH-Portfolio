import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/github-streak': {
        target: 'https://github-readme-streak-stats.herokuapp.com',
        changeOrigin: true,
        rewrite: (path) => {
          // Extract username from query params and construct the proxy URL
          const url = new URL(path, 'http://localhost');
          const username = url.searchParams.get('username');
          return `/?user=${username}&type=json`;
        },
      },
    },
  },
})
