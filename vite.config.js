import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Static multi-page build for GitHub Pages (served from main branch, /docs folder).
// base "./" keeps every asset path relative, so the site works under
// /Memoir-Flutter/ today and on a custom domain later without changes.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir: "docs",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        guide: resolve(import.meta.dirname, "guide/index.html"),
        privacy: resolve(import.meta.dirname, "privacy-policy/index.html"),
      },
    },
  },
});
