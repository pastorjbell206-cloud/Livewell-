/**
 * Two test projects, one `pnpm test`:
 *  - server: the existing node-environment suite (DB-gated suites skip
 *    themselves when DATABASE_URL is unset — unchanged behavior).
 *  - client: jsdom + @testing-library for client/src — money-path contract
 *    tests and the route render-smoke net.
 */
import { defineWorkspace } from "vitest/config";
import path from "path";

const root = path.resolve(import.meta.dirname);
const alias = {
  "@": path.resolve(root, "client", "src"),
  "@shared": path.resolve(root, "shared"),
  "@assets": path.resolve(root, "attached_assets"),
};

export default defineWorkspace([
  {
    root,
    resolve: { alias },
    test: {
      name: "server",
      environment: "node",
      include: ["server/**/*.test.ts", "server/**/*.spec.ts"],
    },
  },
  {
    root,
    resolve: { alias },
    // Without this, esbuild transforms JSX in classic mode and every render
    // dies with "React is not defined".
    esbuild: { jsx: "automatic" },
    test: {
      name: "client",
      environment: "jsdom",
      include: ["client/src/**/*.test.{ts,tsx}"],
      setupFiles: [path.resolve(root, "client", "src", "test", "setup.ts")],
    },
  },
]);
