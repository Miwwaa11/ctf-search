import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/ctftime': {
        target: 'https://ctftime.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ctftime/, ''),
      },
    },
  },
})
