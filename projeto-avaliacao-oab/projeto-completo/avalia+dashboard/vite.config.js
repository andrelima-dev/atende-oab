import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@admin_components": path.resolve(__dirname, "./src/admin/dashbord-novo/app/components"),
        },
    },
});
