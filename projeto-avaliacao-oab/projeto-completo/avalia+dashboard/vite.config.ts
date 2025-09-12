import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Este apelido continua apontando para a pasta src principal
      "@": path.resolve(__dirname, "./src"),
      
      // ESTE É O NOVO APELIDO MÁGICO
      // Ele aponta diretamente para a sua pasta de componentes do admin
      "@admin_components": path.resolve(__dirname, "./src/admin/dashbord-novo/app/components"),
    },
  },
})