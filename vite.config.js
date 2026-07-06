import { defineConfig } from 'vite'
import react from '@vitejs/react-vite'

export default defineConfig({
  // Replace e-plantShopping with your actual GitHub repository name if it differs
  base: "/e-plantShopping", 
  plugins: [react()],
})