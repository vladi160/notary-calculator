import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// When deployed to GitHub Pages the app lives under /notary-calculator/
// In dev mode BASE_URL is not set, so we fall back to "/"
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_URL ?? "/",
});
