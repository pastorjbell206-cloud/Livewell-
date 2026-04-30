#!/usr/bin/env node
/**
 * Generate a bcrypt hash for the admin password.
 *
 * Usage:
 *   node scripts/generate-admin-hash.mjs YourPasswordHere
 *
 * Then set the output as ADMIN_PASSWORD_HASH in your Vercel environment variables.
 */

import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password) {
  console.error("Usage: node scripts/generate-admin-hash.mjs <password>");
  console.error("Example: node scripts/generate-admin-hash.mjs MySecurePassword123");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
console.log("\n=== Admin Password Hash ===");
console.log(hash);
console.log("\nSet this in Vercel:");
console.log("  1. Go to https://vercel.com/dashboard → your project → Settings → Environment Variables");
console.log("  2. Add: ADMIN_PASSWORD_HASH = " + hash);
console.log("  3. Also ensure JWT_SECRET is set (any random 32+ character string)");
console.log("  4. Redeploy the site\n");
