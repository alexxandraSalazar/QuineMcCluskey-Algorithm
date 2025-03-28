import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@shadcn': path.resolve(__dirname, 'node_modules/shadcn/dist'), // Assuming the dist folder is where shadcn's assets are
    },
  },
})