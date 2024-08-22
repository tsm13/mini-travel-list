import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Mini Travel List",
        short_name: "Mini Travel List",
        description: "Minimalist travel list PWA",
        icons: [
          {
            src: "/images/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        start_url: "https://mini-travel-list-tsm13.netlify.app",
        display: "standalone",
        theme_color: "#27272a",
        background_color: "#27272a",
      },
    }),
  ],
});
