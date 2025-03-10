import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/Braille-Web-App/", 
  build: {
    outDir: 'dist', // Asegura que el build se genere en la carpeta correcta
    emptyOutDir: true, // Limpia la carpeta antes de cada build
  },
})
