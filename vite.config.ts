import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import million from 'million/compiler'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    million.vite({
      auto: {
        threshold: 0.05,
        skip: ['useBadHook', /BadComponent/],
      }
    }),
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
