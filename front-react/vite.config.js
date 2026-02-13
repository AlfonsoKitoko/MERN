import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "certs/localhost-2daw-2526.key")),
      cert: fs.readFileSync(path.resolve(__dirname, "certs/localhost-2daw-2526.crt"))
    },
    port: 5173
  }
})
