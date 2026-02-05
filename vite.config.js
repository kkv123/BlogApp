import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',   // must match router basename
  build: {
    outDir: 'dist', // or 'build' if you prefer, just match Vercel settings
  },
})