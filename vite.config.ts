import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "SafeAI Pakistan",
        short_name: "SafeAI",

        description:
          "AI Powered Disaster & Emergency Assistant for Pakistan",

        theme_color: "#0f172a",
        background_color: "#020617",

        display: "standalone",

        start_url: "/",

        icons: [
          {
            src: "/favicon.svg",
            sizes: "192x192",
            type: "image/svg+xml",
          },
          {
            src: "/favicon.svg",
            sizes: "512x512",
            type: "image/svg+xml",
          },
        ],
      },
    }),
  ],
});