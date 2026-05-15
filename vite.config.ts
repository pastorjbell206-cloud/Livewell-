import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

const plugins = [react(), tailwindcss(), jsxLocPlugin()];

export default defineConfig({
    plugins,
    resolve: {
          alias: {
                  "@": path.resolve(import.meta.dirname, "client", "src"),
                  "@shared": path.resolve(import.meta.dirname, "shared"),
                  "@assets": path.resolve(import.meta.dirname, "attached_assets"),
          },
    },
    envDir: path.resolve(import.meta.dirname),
    root: path.resolve(import.meta.dirname, "client"),
    publicDir: path.resolve(import.meta.dirname, "client", "public"),
    build: {
          outDir: path.resolve(import.meta.dirname, "dist/public"),
          emptyOutDir: true,
          sourcemap: "hidden",
          rollupOptions: {
                  output: {
                            manualChunks(id) {
                                        if (!id.includes("node_modules")) return;
                                        if (/[\\/]react[\\/]|[\\/]react-dom[\\/]/.test(id)) return "vendor-react";
                                        if (/[\\/]@radix-ui[\\/]|[\\/]cmdk[\\/]|[\\/]vaul[\\/]/.test(id)) return "vendor-ui";
                                        if (/[\\/]recharts[\\/]|[\\/]d3-/.test(id)) return "vendor-charts";
                                        if (/[\\/]framer-motion[\\/]/.test(id)) return "vendor-motion";
                                        return "vendor";
                            },
                  },
          },
    },
    server: {
          host: true,
          fs: {
                  strict: true,
                  deny: ["**/.*"],
          },
    },
});
