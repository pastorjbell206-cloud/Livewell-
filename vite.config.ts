import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const plugins = [
  react(),
  tailwindcss(),
  jsxLocPlugin(),
  VitePWA({
    // Ship a self-destroying service worker: it unregisters any previously
    // installed SW and clears its caches, so deploys always show up on the next
    // load instead of being shadowed by a stale precached app shell. The PWA's
    // aggressive caching repeatedly hid new deploys (articles, the book page);
    // for a frequently-updated content site, fresh-from-network wins.
    selfDestroying: true,
    registerType: "autoUpdate",
    includeAssets: ["robots.txt", "sitemap.xml"],
    manifest: {
      name: "LiveWell by James Bell",
      short_name: "LiveWell",
      description:
        "Connecting the depth of theology to the weight of everyday life.",
      theme_color: "#1A1A1A",
      background_color: "#F5F0E6",
      display: "standalone",
      start_url: "/",
      icons: [
        {
          src: "/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
    workbox: {
      // Precache only the app shell (~1.6 MB), not the dozens of
      // lazy-loaded chunks (~15 MB) or the 300+ content JSON files in
      // client/public. Lazy chunks and content are cached at runtime
      // as they are visited.
      globPatterns: [
        "**/*.html",
        "assets/index-*.{js,css}",
        "assets/vendor-*.js",
        "pwa-*.png",
      ],
      // Never let the SPA fallback swallow the admin or the API.
      navigateFallbackDenylist: [/^\/admin/, /^\/api/],
      runtimeCaching: [
        {
          // API is never cached. Must stay first so it wins over the
          // navigation route.
          urlPattern: ({ url, sameOrigin }) =>
            sameOrigin && url.pathname.startsWith("/api/"),
          handler: "NetworkOnly",
        },
        {
          // App navigations: fresh when online, cached shell when offline.
          urlPattern: ({ request }) => request.mode === "navigate",
          handler: "NetworkFirst",
          options: {
            cacheName: "pages",
            networkTimeoutSeconds: 5,
            expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
        {
          // Library content: essays/guides JSON readable offline once visited.
          urlPattern: ({ url, sameOrigin }) =>
            sameOrigin &&
            (/^\/(leadership|context|life)\/.*\.json$/.test(url.pathname) ||
              /^\/family[^/]*\.json$/.test(url.pathname)),
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "library-content",
            expiration: { maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 30 },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
        {
          // Hashed build assets (lazy route chunks, CSS). Content-hashed
          // filenames are immutable, so CacheFirst is safe; this is what
          // keeps previously-visited pages readable offline without
          // precaching every chunk up front.
          urlPattern: ({ url, sameOrigin }) =>
            sameOrigin && url.pathname.startsWith("/assets/"),
          handler: "CacheFirst",
          options: {
            cacheName: "build-assets",
            expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
        {
          // Google Fonts stylesheets + font files.
          urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/,
          handler: "CacheFirst",
          options: {
            cacheName: "fonts",
            expiration: { maxEntries: 40, maxAgeSeconds: 60 * 60 * 24 * 30 },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
        {
          urlPattern: ({ request }) =>
            request.destination === "font" || request.destination === "image",
          handler: "CacheFirst",
          options: {
            cacheName: "static-assets",
            expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
      ],
    },
  }),
];

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
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-ui": ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-tabs", "@radix-ui/react-tooltip", "@radix-ui/react-select"],
          "vendor-charts": ["recharts"],
          "vendor-motion": ["framer-motion"],
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
