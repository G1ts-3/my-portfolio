import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/my-portfolio/', // GANTI sesuai nama repo
  plugins: [react()],
})