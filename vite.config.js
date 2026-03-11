import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const ignoredPaths = [
  '**/legacy_html/**',
  '**/onetransfer Published/**',
  '**/dist/**',
  '**/.git/**',
]

export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: 'Assets',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
    watch: {
      ignored: ignoredPaths,
    },
  },
  optimizeDeps: {
    entries: ['index.html'],
  },
})
