import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Allow access from external IPs
    allowedHosts: [".ngrok-free.app"], // Allow ngrok subdomains
  },
});
