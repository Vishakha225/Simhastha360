import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: './app', // points to your app folder
  server: {
    port: 3000
  }
})
